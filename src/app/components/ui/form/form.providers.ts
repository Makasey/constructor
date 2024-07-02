import { Provider } from "@angular/core";

import { AbstractFormService, DefaultFormService } from "./form.service";

export function provideForm(): Provider {
    return {
        provide: AbstractFormService,
        useClass: DefaultFormService,
    };
}
