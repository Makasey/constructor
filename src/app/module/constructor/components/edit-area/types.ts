import { RootComponent, SectionComponent, SitePageElementType, TitleComponent } from "@modules/constructor";
import { Type } from "@angular/core";

export const sitePageElementMap: Record<SitePageElementType, Type<unknown>> = {
    [SitePageElementType.TITLE]: TitleComponent,
    [SitePageElementType.PAGE]: RootComponent,
    [SitePageElementType.SECTION]: SectionComponent,
};
