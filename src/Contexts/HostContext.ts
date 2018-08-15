import { ConfigManager } from '../Config/ConfigManager';
import { HostConfig } from '../Config/Types';
import { ActionType } from '../Schema/Abstract/ActionElement';
import { OpenUrlActionElement } from '../Schema/Actions/OpenUrlAction';
import { ShowCardActionElement } from '../Schema/Actions/ShowCardAction';
import { SubmitActionElement } from '../Schema/Actions/SubmitAction';
import { IElement } from '../Schema/Interfaces/IElement';
import { CallbackAction } from '../Schema/Internal/CallbackAction';
import { ActionEventHandlerArgs } from '../Shared/Types';

export class HostContext {
    private config: HostConfig;
    private onError?: (error: any) => void;
    private onInfo?: (info: any) => void;
    private onWarning?: (warning: any) => void;
    private onFocus?: () => void;
    private onBlur?: () => void;
    private onOpenUrl: (args?: ActionEventHandlerArgs<OpenUrlActionElement>) => void;
    private onShowCard: (args?: ActionEventHandlerArgs<ShowCardActionElement>) => void;
    private onSubmit: (args?: ActionEventHandlerArgs<SubmitActionElement>) => void;
    private onCallback: (args?: ActionEventHandlerArgs<CallbackAction>) => void;

    private static sharedInstance: HostContext;

    private constructor() { 
        this.config = ConfigManager.getInstance().getDefaultConfig();
    }

    public static getInstance() {
        if (HostContext.sharedInstance === undefined) {
            HostContext.sharedInstance = new HostContext();
        }
        return HostContext.sharedInstance;
    }

    public registerErrorHandler(handler: (error: any) => void) {
        this.onError = handler;
    }

    public registerInfoHandler(handler: (info: any) => void) {
        this.onInfo = handler;
    }

    public registerWarningHandler(handler: (warning: any) => void) {
        this.onWarning = handler;
    }

    public registerFocusHandler(handler: (args?: ActionEventHandlerArgs<OpenUrlActionElement>) => void) {
        this.onFocus = handler;
    }

    public registerBlurHandler(handler: (args?: ActionEventHandlerArgs<OpenUrlActionElement>) => void) {
        this.onBlur = handler;
    }

    public registerOpenUrlHandler(handler: (args?: ActionEventHandlerArgs<OpenUrlActionElement>) => void) {
        this.onOpenUrl = handler;
    }

    public registerShowCardHandler(handler: (args?: ActionEventHandlerArgs<ShowCardActionElement>) => void) {
        this.onShowCard = handler;
    }

    public registerSubmitHandler(handler: (args?: ActionEventHandlerArgs<SubmitActionElement>) => void) {
        this.onSubmit = handler;
    }

    public registerCallbackHandler(handler: (args?: ActionEventHandlerArgs<CallbackAction>) => void) {
        this.onCallback = handler;
    }

    public applyConfig(configJson: any) {
        this.config.combine(new HostConfig(configJson));
    }

    public getConfig() {
        return this.config;
    }

    public getHandler(type: ActionType | 'focus' | 'blur' | 'error' | 'warning' | 'info') {
        let callback: (args?: ActionEventHandlerArgs<IElement>) => void;
        switch (type) {
            case ActionType.OpenUrl:
                callback = this.onOpenUrl;
                break;
            case ActionType.Callback:
                callback = this.onCallback;
                break;
            case ActionType.ShowCard:
                callback = this.onShowCard;
                break;
            case ActionType.Submit:
                callback = this.onSubmit;
                break;
            case 'focus':
                callback = this.onFocus;
                break;
            case 'blur':
                callback = this.onBlur;
                break;
            case 'error':
                callback = this.onError;
                break;
            case 'info':
                callback = this.onInfo;
                break;
            case 'warning':
                callback = this.onWarning;
                break;
        }
        return callback;
    }
}
