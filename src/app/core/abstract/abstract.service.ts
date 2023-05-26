import { Directive, OnDestroy, OnInit } from "@angular/core";

import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { Observable, catchError, debounceTime, filter, map, of, switchMap, tap, throwError } from "rxjs";

import { LzQuery } from "../store/lz.query";
import { LzService } from "../store/lz.service";
import { LzState } from "../store/lz.state";
import { ModuleState, UIDataState } from "../store/states/ui-states";
import { StateCallbackOrPart } from "../store/types";

type Rec = Record<string, unknown>;

export abstract class AbstractModuleService<T extends Rec = Rec> {
    public abstract asyncInit(options?: T): Observable<unknown>;

    public abstract selectUiLoading(): Observable<boolean>;

    public abstract selectUiExtraLoading(): Observable<boolean>;

    public abstract selectUiSaving(): Observable<boolean>;

    public abstract selectUiError(): Observable<boolean>;

    public abstract updateDataState(dataState: UIDataState): void;

    public abstract reloadState(): void;

    public abstract onComponentDestroy(): Observable<unknown>;

    public abstract selectToLoadState(): Observable<unknown>;
}

export abstract class AbstractDefaultModuleService<K extends keyof LzState, T extends Rec = Rec> implements AbstractModuleService {
    protected options: T;

    protected constructor(protected readonly stateKey: K, protected query: LzQuery, protected service: LzService) {}

    public abstract asyncInit(options?: T): Observable<unknown>;

    public selectUiLoading(): Observable<boolean> {
        return this.query.selectStatePart<K>(this.stateKey).pipe(
            map(state => {
                return [UIDataState.INITIAL, UIDataState.LOADING, UIDataState.INVOKE_RELOAD].includes((state as ModuleState).dataState);
            }),
        );
    }

    public selectState<R>(project: (store: LzState[K]) => R): Observable<R> {
        return this.query.select(state => state[this.stateKey]).pipe(map(project));
    }

    public getState(): LzState[K] {
        return this.query.getValue()[this.stateKey];
    }

    public updateState(callbackOrPart: StateCallbackOrPart<K>): void {
        return this.service.updateStatePart(this.stateKey, callbackOrPart);
    }

    public reInitiateState(): void {
        this.service.reInitiateStatePart(this.stateKey);
    }

    public selectUiExtraLoading(): Observable<boolean> {
        return this.query.selectStatePart<K>(this.stateKey).pipe(
            map(state => {
                return (state as ModuleState).dataState === UIDataState.EXTRA_LOADING;
            }),
        );
    }

    public selectUiSaving(): Observable<boolean> {
        return this.query.selectStatePart<K>(this.stateKey).pipe(
            map(state => {
                return (state as ModuleState).dataState === UIDataState.SAVING;
            }),
        );
    }

    public selectUiLoaded(): Observable<boolean> {
        return this.query.selectStatePart<K>(this.stateKey).pipe(
            map(state => {
                return (state as ModuleState).dataState === UIDataState.LOADED;
            }),
        );
    }

    public selectUiError(): Observable<boolean> {
        return this.query.selectStatePart<K>(this.stateKey).pipe(map(state => (state as ModuleState).dataState === UIDataState.ERROR));
    }

    public updateDataState(dataState: Exclude<UIDataState, UIDataState.INITIAL | UIDataState.INVOKE_RELOAD>): void {
        this.service.updateDataState<K>(this.stateKey, dataState);
    }

    public reloadState(): void {
        this.service.updateDataState<K>(this.stateKey, UIDataState.INVOKE_RELOAD);
    }

    public onComponentDestroy(): Observable<unknown> {
        return of(null).pipe(
            tap(() => {
                this.service.reInitiateStatePart(this.stateKey);
            }),
        );
    }

    public selectToLoadState(): Observable<unknown> {
        return this.query.selectStatePart<K>(this.stateKey).pipe(
            map(state => {
                return state.dataState;
            }),
            debounceTime(10),
            filter(value => [UIDataState.INITIAL, UIDataState.INVOKE_RELOAD].includes(value)),
        );
    }
}

@UntilDestroy()
@Directive()
export abstract class AbstractModuleComponent<T extends Rec = Rec> implements OnInit, OnDestroy {
    public readonly _loading$ = this.service.selectUiLoading();

    public readonly _error$ = this.service.selectUiError();

    public readonly _extraLoading$ = this.service.selectUiExtraLoading();

    public readonly _saving$ = this.service.selectUiSaving();

    protected constructor(protected service: AbstractModuleService<T>) {}

    public ngOnInit(options?: T): void {
        this.init(options).pipe(untilDestroyed(this)).subscribe();
    }

    public init(options?: T): Observable<unknown> {
        return this.service.selectToLoadState().pipe(
            switchMap(() => this.service.asyncInit(options)),
            catchError(err => {
                this.service.updateDataState(UIDataState.ERROR);
                return throwError(err);
            }),
        );
    }

    public ngOnDestroy(): void {
        this.service.onComponentDestroy().pipe(untilDestroyed(this)).subscribe();
    }
}
