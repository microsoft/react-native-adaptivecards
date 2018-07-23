import { ActionType } from '../Schema/Abstract/ActionElement';
export class HostContext {
    constructor() { }
    static getInstance() {
        if (HostContext.sharedInstance === undefined) {
            HostContext.sharedInstance = new HostContext();
        }
        return HostContext.sharedInstance;
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
        }
        return callback;
    }
}
