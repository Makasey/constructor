import {
    AccordionElementComponent,
    ImageComponent,
    InnerComponent,
    RootComponent,
    SectionComponent,
    SitePageElementType,
    SpacerComponent,
    TabElementItemComponent,
    TabsComponent,
    TextComponent,
    TitleComponent,
} from "@modules/constructor";
import { Type } from "@angular/core";

export const sitePageElementMap: Record<SitePageElementType, Type<unknown>> = {
    [SitePageElementType.TITLE]: TitleComponent,
    [SitePageElementType.PAGE]: RootComponent,
    [SitePageElementType.SECTION]: SectionComponent,
    [SitePageElementType.INNER]: InnerComponent,
    [SitePageElementType.IMAGE]: ImageComponent,
    [SitePageElementType.TABS]: TabsComponent,
    [SitePageElementType.TABS_ITEM]: TabElementItemComponent,
    [SitePageElementType.TEXT]: TextComponent,
    [SitePageElementType.SPACER]: SpacerComponent,
    [SitePageElementType.ACCORDION]: AccordionElementComponent,
};
