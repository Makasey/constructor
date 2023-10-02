export type WebsocketConfig = Readonly<{
    url: string;
}>;

export type WebsocketCallback = (eventName: string, ...args: unknown[]) => void;
