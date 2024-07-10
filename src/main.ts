import { bootstrapApplication } from "@angular/platform-browser";
import { enableProdMode } from "@angular/core";

import { AppComponent } from "app/app.component";
import { ROOT_PROVIDERS } from "app/providers";
import { environment } from "environments/environment";

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [...ROOT_PROVIDERS],
}).catch(err => console.error(err));
