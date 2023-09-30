import {
    CampaignListState,
    EditorState,
    FilesState,
    InitialStateFunctions,
    TableState,
    initialCampaignListState,
    initialEditorState,
    initialFilesState,
    initialTableState,
} from "@core";

export enum LzStateKey {
    TABLE_STATE = "tableState",
    FILES_STATE = "filesState",
    EDITOR_STATE = "editorState",
    CAMPAIGN_LIST = "campaignList",
}

export type LzState = Readonly<{
    [LzStateKey.FILES_STATE]: FilesState;
    [LzStateKey.EDITOR_STATE]: EditorState;
    [LzStateKey.TABLE_STATE]: TableState;
    [LzStateKey.CAMPAIGN_LIST]: CampaignListState;
}>;

export const lzInitialStateFunctions: InitialStateFunctions = {
    [LzStateKey.FILES_STATE]: initialFilesState,
    [LzStateKey.EDITOR_STATE]: initialEditorState,
    [LzStateKey.TABLE_STATE]: initialTableState,
    [LzStateKey.CAMPAIGN_LIST]: initialCampaignListState,
};

export function createLZInitialState(): LzState {
    return Object.keys(lzInitialStateFunctions).reduce((result, next: string) => {
        const initialFunction = lzInitialStateFunctions[next] as () => LzState;

        if (!initialFunction) {
            return result;
        }

        return {
            ...result,
            [next]: initialFunction(),
        };
    }, {}) as LzState;
}
