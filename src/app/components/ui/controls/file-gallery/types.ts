import { LzStateKey, createStoreProviders } from "@core/store";

import { AbstractFileGalleryService, FileGalleryService } from "./file-gallery/file-gallery.service";

export const FILE_UPLOAD_PROVIDERS = [
    ...createStoreProviders(LzStateKey.FILES_STATE),
    {
        provide: AbstractFileGalleryService,
        useClass: FileGalleryService,
    },
];
