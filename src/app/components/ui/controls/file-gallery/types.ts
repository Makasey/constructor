import { LzStateKey, createStoreProviders } from "@core";

import { AbstractFileGalleryService, FileGalleryService } from "@components";

export const FILE_UPLOAD_PROVIDERS = [
    ...createStoreProviders(LzStateKey.FILES_STATE),
    {
        provide: AbstractFileGalleryService,
        useClass: FileGalleryService,
    },
];
