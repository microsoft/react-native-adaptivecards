import { ConfigManager } from '../Configs/ConfigManager';
import { HostConfig } from '../Configs/Types';
import { ActionError, ActionResult } from '../Shared/ActionResult';

export class Host {
    private errorHandler: (error: any) => void;
    private infoHandler: (info: any) => void;
    private warningHandler: (warning: any) => void;
    private focusHandler: () => void;
    private blurHandler: () => void;
    private openUrlActionHandler: (url: string, method: string, data: { [key: string]: string }) => Promise<ActionResult>;
    private submitActionHandler: (data: any) => Promise<ActionResult>;
    private callbackActionHandler: (url: string, parameters: { [key: string]: string }) => Promise<ActionResult>;
    private config: HostConfig;
    private static sharedInstance: Host;

    private constructor() {
        this.config = ConfigManager.getInstance().getConfig();
    }

    public static getInstance() {
        if (Host.sharedInstance === undefined) {
            Host.sharedInstance = new Host();
        }
        return Host.sharedInstance;
    }

    public applyConfig(config: any) {
        const parsedConfig = ConfigManager.parseConfig(config);
        if (this.config) {
            this.config = this.config.combine(parsedConfig);
        } else {
            this.config = parsedConfig;
        }
    }

    public getConfig() {
        return this.config;
    }

    public registerErrorHandler(handler: (error: any) => void): void {
        if (handler) {
            this.errorHandler = handler;
        }
    }

    public registerInfoHandler(handler: (info: any) => void): void {
        if (handler) {
            this.infoHandler = handler;
        }
    }

    public registerWarningHandler(handler: (warning: any) => void): void {
        if (handler) {
            this.warningHandler = handler;
        }
    }

    public registerFocusHandler(handler: () => void): void {
        if (handler) {
            this.focusHandler = handler;
        }
    }

    public registerBlurHandler(handler: () => void): void {
        if (handler) {
            this.blurHandler = handler;
        }
    }

    public registerOpenUrlActionHandler(handler: (url: string, method: string, data: any) => Promise<ActionResult>) {
        if (handler) {
            this.openUrlActionHandler = handler;
        }
    }

    public registerSubmitActionHandler(handler: (data: any) => Promise<ActionResult>) {
        if (handler) {
            this.submitActionHandler = handler;
        }
    }

    public registerCallbackActionHandler(handler: (url: string, parameters: { [key: string]: string }) => Promise<ActionResult>) {
        if (handler) {
            this.callbackActionHandler = handler;
        }
    }

    public onError(error: any): void {
        if (this.errorHandler) {
            this.errorHandler(error);
        }
    }

    public onInfo(info: any): void {
        if (this.infoHandler) {
            this.infoHandler(info);
        }
    }
    public onWarning(warning: any): void {
        if (this.warningHandler) {
            this.warningHandler(warning);
        }
    }

    public onFocus(): void {
        if (this.focusHandler) {
            this.focusHandler();
        }
    }

    public onBlur(): void {
        if (this.blurHandler) {
            this.blurHandler();
        }
    }

    public onOpenUrlAction(url: string, method: string, data: { [key: string]: string }): Promise<ActionResult> {
        if (this.openUrlActionHandler) {
            return this.openUrlActionHandler(url, method, data);
        }
        return Promise.reject(ActionError.handlerNotFound);
    }

    public onSubmitAction(data: any): Promise<ActionResult> {
        if (this.onSubmitAction) {
            return this.submitActionHandler(data);
        }
        return Promise.reject(ActionError.handlerNotFound);
    }

    public onCallbackAction(url: string, parameters: { [key: string]: string }): Promise<ActionResult> {
        if (this.onCallbackAction) {
            return this.callbackActionHandler(url, parameters);
        }
        return Promise.reject(ActionError.handlerNotFound);
    }
}
