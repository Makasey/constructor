import { Injector, assertInInjectionContext, inject } from "@angular/core";

export function assertInjector(debugFn: Function, injector: Injector | undefined | null): Injector {
    if (!injector) {
        assertInInjectionContext(debugFn);
    }

    return injector ?? inject(Injector);
}
