import { ConfigManager } from '../Config/ConfigManager';
import { HostConfig } from '../Config/Types';
import { ActionType } from '../Schema/Abstract/ActionElement';
export class HostContext {
    constructor() {
        this.config = ConfigManager.getInstance().getDefaultConfig();
    }
    static getInstance() {
        if (HostContext.sharedInstance === undefined) {
            HostContext.sharedInstance = new HostContext();
        }
        return HostContext.sharedInstance;
    }
    registerErrorHandler(handler) {
        this.onError = handler;
    }
    registerInfoHandler(handler) {
        this.onInfo = handler;
    }
    registerWarningHandler(handler) {
        this.onWarning = handler;
    }
    registerFocusHandler(handler) {
        this.onFocus = handler;
    }
    registerBlurHandler(handler) {
        this.onBlur = handler;
    }
    registerOpenUrlHandler(handler) {
        this.onOpenUrl = handler;
    }
    registerShowCardHandler(handler) {
        this.onShowCard = handler;
    }
    registerSubmitHandler(handler) {
        this.onSubmit = handler;
    }
    registerCallbackHandler(handler) {
        this.onCallback = handler;
    }
    applyConfig(configJson) {
        this.config.combine(new HostConfig(configJson));
    }
    getConfig() {
        return this.config;
    }
    getHandler(type) {
        let callback;
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
