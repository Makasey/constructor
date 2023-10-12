import { CreateCampaignModel } from "@modules/constructor";
import { EditorState } from "@core";

export function getPreviewData(state: EditorState): CreateCampaignModel {
    const { pages, items } = state;

    return {
        type: "page",
        body: {
            pages: pages,
            elements: items,
        },
    };
}
