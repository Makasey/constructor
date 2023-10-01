import { APFormModel } from "@components";
import { DEFAULT_UPSERT_CONFIG, InnerPageElement } from "@modules/constructor";

export function getInnerSettings(element: InnerPageElement): APFormModel {
    return {
        id: "elementSettings",
        name: "elementSettings",
        upsertConfig: DEFAULT_UPSERT_CONFIG,
        controls: [],
        innerGroups: [],
    };
}
