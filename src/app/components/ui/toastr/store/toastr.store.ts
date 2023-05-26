import { Injectable } from "@angular/core";

import { EntityStore, StoreConfig, toBoolean } from "@datorama/akita";

import { LOCAL_STORAGE_ENABLED_TOASTR_DND_MODE, LZToastrItem, LZToastrItemState, getInitialToastrItemState } from "../types";

@Injectable()
@StoreConfig({
    name: "lz-toastr",
    resettable: true,
})
export class LZToastrStore extends EntityStore<LZToastrItemState, LZToastrItem> {
    constructor() {
        super(
            getInitialToastrItemState({
                enableDNDMode: toBoolean(localStorage.getItem(LOCAL_STORAGE_ENABLED_TOASTR_DND_MODE)),
            }),
        );
    }
}
