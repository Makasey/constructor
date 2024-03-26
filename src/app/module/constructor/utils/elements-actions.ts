import { ElementActionsConfigItem, SitePageElementType, deleteElementActionConfig, duplicateElementActionConfig } from "@modules/constructor";

export function processCreateElementActions(type: SitePageElementType): ElementActionsConfigItem[] {
    switch (type) {
        default: {
            return [deleteElementActionConfig, duplicateElementActionConfig];
        }
    }
}
