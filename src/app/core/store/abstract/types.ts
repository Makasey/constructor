import { AbstractLzStoreService } from "@core/store/abstract/lz-abstract.service";
import { InjectionToken } from "@angular/core";
import { LzAbstractQuery } from "@core/store/abstract/lz-abstract.query";
import { LzStateKey } from "@core/store/lz.state";

export const LzQueryInjectionTokensMap: Partial<Record<LzStateKey, InjectionToken<LzAbstractQuery<any>>>> = {};

export const LzServiceInjectionTokensMap: Partial<Record<LzStateKey, InjectionToken<AbstractLzStoreService<any>>>> = {};
