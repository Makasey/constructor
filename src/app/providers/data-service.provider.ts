import {
    AbstractCampaignDataService,
    AbstractFilesDataService,
    CampaignDataService,
    DefaultFilesDataService,
    LZAbstractAuthDataService,
    LZDefaultAuthDataService,
} from "@core";

export const DATA_SERVICES_PROVIDERS = [
    {
        provide: LZAbstractAuthDataService,
        useClass: LZDefaultAuthDataService,
    },
   
    {
        provide: AbstractCampaignDataService,
        useClass: CampaignDataService,
    },
    {
        provide: AbstractFilesDataService,
        useClass: DefaultFilesDataService,
    },  
];