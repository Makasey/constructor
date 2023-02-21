import { ID, guid, transaction } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { LOCAL_STORAGE_ENABLED_TOASTR_DND_MODE, LZToastrItem, LZToastrItemUIState } from "../types";
import { LZToastrStore } from "./toastr.store";
import { LzToastrQuery } from "./toastr.query";

@Injectable()
export class LZToastrService {
    private order: 0;

    constructor(private toastrStore: LZToastrStore, private toastrQuery: LzToastrQuery) {}

    public addToastrItem(toastrItem: LZToastrItem): void {
        const id = guid();
        this.toastrQuery.addTemplateOrComponent(id, toastrItem.template!);

        this.toastrStore.add({
            id: id,
            order: this.order++,
            ...toastrItem,
            template: null!,
            visibility: true,
        });
    }

    public hideToastrItem(toasterItemId: ID): void {
        const alwaysOnDisplay = this.toastrQuery.getAlwaysOnDisplay();

        if (!alwaysOnDisplay) {
            this.toastrStore.update(toasterItemId, entity => {
                return {
                    ...entity,
                    visibility: false,
                };
            });
        }
    }

    public removeToastrItem(toastrItemId: ID): void {
        this.toastrQuery.removeTemplateRef(toastrItemId);

        this.toastrStore.remove(toastrItemId);
    }

    @transaction()
    public setAlwaysOnDisplay(alwaysOnDisplay: boolean): void {
        if (!alwaysOnDisplay) {
            this.toastrStore.update(null, entity => {
                return {
                    ...entity,
                    visibility: false,
                };
            });

            this.updateUIState({
                alwaysOnDisplay: alwaysOnDisplay,
            });
        }
    }

    /*
     ** DND mode - Do not disturb mode (режим 'не беспокоить')
     */
    public setEnableDNDMode(enableDNDMode: boolean): void {
        this.updateUIState({
            enableDNDMode: enableDNDMode,
        });

        localStorage.setItem(LOCAL_STORAGE_ENABLED_TOASTR_DND_MODE, `${enableDNDMode}`);
    }

    public resetState(): void {
        this.toastrStore.reset();
    }

    private updateUIState(partialState: Partial<LZToastrItemUIState>): void {
        this.toastrStore.update(state => {
            return {
                ui: {
                    ...state.ui,
                    ...partialState,
                },
            };
        });
    }
}
