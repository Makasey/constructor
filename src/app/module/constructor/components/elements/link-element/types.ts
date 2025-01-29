import { LinkTargetType, SitePageElement, SitePageElementBackground } from "@modules/constructor";

export type LinkPageElement = SitePageElement<LinkPageElementSettings>;

export type LinkPageElementSettings = Readonly<
    {
        text: string;
        link: string;
        color: string;
        target: LinkTargetType;
    } & SitePageElementBackground
>;
