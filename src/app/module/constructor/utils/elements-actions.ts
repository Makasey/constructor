import {
    ElementActionsConfigItem,
    SitePageElementType,
    deleteElementActionConfig,
    duplicateElementActionConfig,
    saveElementActionConfig,
} from "@modules/constructor";

export function processCreateElementActions(type: SitePageElementType): ElementActionsConfigItem[] {
    switch (type) {
        default: {
            return [deleteElementActionConfig, duplicateElementActionConfig, saveElementActionConfig];
        }
    }
}
