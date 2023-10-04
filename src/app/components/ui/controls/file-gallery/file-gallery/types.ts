import { AbstractFileGalleryService, FileGalleryService } from "@components/ui";
import { LzStateKey, createStoreProviders } from "@core";

export const FILE_UPLOAD_PROVIDERS = [
    ...createStoreProviders(LzStateKey.FILES_STATE),
    {
        provide: AbstractFileGalleryService,
        useClass: FileGalleryService,
    },
];
