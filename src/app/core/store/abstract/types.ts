import { AbstractLzStoreService, LzAbstractQuery, LzStateKey } from "@core";
import { InjectionToken } from "@angular/core";

export const LzQueryInjectionTokensMap: Partial<Record<LzStateKey, InjectionToken<LzAbstractQuery<any>>>> = {};

export const LzServiceInjectionTokensMap: Partial<Record<LzStateKey, InjectionToken<AbstractLzStoreService<any>>>> = {};
