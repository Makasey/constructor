import { LinkTargetType } from "@modules/constructor";

export const defaultLinkTargetControls = [
    { label: "Blank", value: LinkTargetType.BLANK },
    { label: "Self", value: LinkTargetType.SELF },
    { label: "Parent", value: LinkTargetType.PARENT },
    { label: "Top", value: LinkTargetType.TOP },
];
