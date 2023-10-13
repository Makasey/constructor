import { Predicate } from "@angular/core";

import { SilentEventPlugin } from "@shared-plugins";
import { isFunction } from "@datorama/akita";

export function shouldCall<T>(predicate: Predicate<T>): MethodDecorator {
    return (_target, _key, desc: PropertyDescriptor): void => {
        const { value } = desc;

        desc.value = function (this: T, ...args: [value: T]): void {
            const shouldCall: boolean = predicate.apply(this, args);

            if (!shouldCall) {
                return;
            }

            if (SilentEventPlugin.ngZone) {
                SilentEventPlugin.ngZone.run(() => value.apply(this, args));
            } else {
                isFunction(value) && value.apply(this, args);
            }
        };
    };
}
