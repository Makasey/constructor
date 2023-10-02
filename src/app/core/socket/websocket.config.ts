import { InjectionToken } from "@angular/core";
import { WebsocketConfig } from "@core";

export const defaultWebsocketConfig: WebsocketConfig = {
    url: "http://localhost:7000",
};

export const WEBSOCKET_CONFIG_TOKEN = new InjectionToken<WebsocketConfig>("WEBSOCKET_CONFIG_TOKEN", {
    factory(): WebsocketConfig {
        return { ...defaultWebsocketConfig };
    },
});
