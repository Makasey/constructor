import { Injectable, OnDestroy, inject } from "@angular/core";
import { Observable, Subscriber, shareReplay } from "rxjs";
import { Socket, io } from "socket.io-client";
import { WEBSOCKET_CONFIG_TOKEN, WebsocketCallback } from "@core";

@Injectable()
export class WebsocketService implements OnDestroy {
    private readonly config = inject(WEBSOCKET_CONFIG_TOKEN);

    private subscribersCounter: Record<string, number> = {};

    private eventStreams$: Record<string, Observable<unknown>> = {};

    private socket: Socket;

    constructor() {
        this.init();
    }

    private init(): void {
        const { url } = this.config;

        this.socket = io(url, { withCredentials: true });
    }

    public sendMessage(eventName: string, messageBody: unknown): void {
        this.socket.emit(eventName, messageBody);
    }

    public removeListener(eventName: string, callback: WebsocketCallback): void {
        this.socket.removeListener(eventName, callback);
    }

    public removeAllListeners(eventName?: string): void {
        this.socket.removeAllListeners(eventName);
    }

    public subscribeToEvent<T = unknown>(eventName: string): Observable<T> {
        if (!this.subscribersCounter[eventName]) {
            this.subscribersCounter[eventName] = 0;
        }

        this.subscribersCounter[eventName]++;

        if (!this.eventStreams$[eventName]) {
            this.eventStreams$[eventName] = new Observable<T>((observer: Subscriber<T>) => {
                const listener = (data: T): void => {
                    observer.next(data);
                };

                this.socket.on(eventName, listener);

                return () => {
                    this.subscribersCounter[eventName]--;
                    if (this.subscribersCounter[eventName] === 0) {
                        observer.complete();
                        observer.unsubscribe();

                        this.socket.removeListener(eventName, listener);
                        delete this.eventStreams$[eventName];
                    }
                };
            }).pipe(shareReplay({ bufferSize: 1, refCount: true }));
        }

        return this.eventStreams$[eventName] as Observable<T>;
    }

    public subscribeToOneTimeEvent<T = unknown>(eventName: string): Observable<T> {
        return new Observable<T>(observer => {
            const listener = (data: T): void => {
                observer.next(data);
                observer.complete();
            };

            this.socket.once(eventName, listener);

            return () => {
                observer.unsubscribe();
            };
        });
    }

    public listenerList(eventName: string): WebsocketCallback[] {
        return this.socket.listeners(eventName);
    }

    public anyListenerList(): WebsocketCallback[] {
        return this.socket.listenersAny();
    }

    public anyOutgoingListenerList(): WebsocketCallback[] {
        return this.socket.listenersAnyOutgoing();
    }

    public offEventListeners(eventName?: string, listener?: WebsocketCallback): void {
        if (!eventName) {
            this.socket.offAny();

            return;
        }

        if (eventName && !listener) {
            this.socket.off(eventName);

            return;
        }

        this.socket.on(eventName, listener!);
    }

    public onAnyEvent(callback: WebsocketCallback): Socket {
        return this.socket.onAny(callback);
    }

    public onAnyOutgoingEvent(callback: WebsocketCallback): Socket {
        return this.socket.onAnyOutgoing(callback);
    }

    public prependAnyEvent(callback: WebsocketCallback): Socket {
        return this.socket.prependAny(callback);
    }

    public prependAnyOutgoingEvent(callback: WebsocketCallback): Socket {
        return this.socket.prependAnyOutgoing(callback);
    }

    public timeout(value: number): Socket {
        return this.socket.timeout(value);
    }

    public volatile(): Socket {
        return this.socket.volatile;
    }

    public ngOnDestroy(): void {
        this.socket.disconnect();
    }
}
