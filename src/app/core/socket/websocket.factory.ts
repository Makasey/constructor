import { Provider } from "@angular/core";
import { WEBSOCKET_CONFIG_TOKEN, WebsocketConfig, WebsocketService, defaultWebsocketConfig } from "@core";

export function provideWebsocket(config: WebsocketConfig): Provider[] {
    const processedConfig = { ...defaultWebsocketConfig, ...(config ?? {}) };

    return [
        {
            provide: WEBSOCKET_CONFIG_TOKEN,
            useValue: processedConfig,
        },
        {
            provide: WebsocketService,
            useClass: WebsocketService,
        },
    ] as Provider[];
}
