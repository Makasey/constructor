import { Predicate } from "@angular/core";

import { SilentEventPlugin } from "../plugins/silent-event.plugin";
import { isFunction } from "@datorama/akita";

export function shouldCall<T>(predicate: Predicate<T>): MethodDecorator {
    return (_target, _key, desc: PropertyDescriptor): void => {
        const { value } = desc;

        desc.value = function (this: T, ...args: [value: T]): void {
            if (!predicate.apply(this, args)) {
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
