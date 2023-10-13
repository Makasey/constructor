import { CreateCampaignModel, CreatePreviewModel } from "@modules/constructor";
import { EditorState } from "@core";

export function getPreviewData(state: EditorState): CreatePreviewModel {
    const { pages, items } = state;

    return {
        type: "page",
        body: {
            pages: pages,
            elements: items,
        },
    };
}

export function getCampaignData(state: EditorState): CreateCampaignModel {
    const { pages, items, campaignName } = state;

    return {
        campaignName: campaignName,
        pages: pages,
        elements: items,
    };
}
