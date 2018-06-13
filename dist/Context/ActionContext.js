import { ActionType } from '../Schema/Base/ActionElement';
export class ActionEventHandlerArgs {
}
export class ActionContext {
    constructor() {
        this.globalHooks = [];
    }
    static getInstance() {
        if (ActionContext.sharedInstance === undefined) {
            ActionContext.sharedInstance = new ActionContext();
        }
        return ActionContext.sharedInstance;
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
    registerGlobalHook(hook) {
        this.globalHooks.push(hook);
    }
    getActionEventHandler() {
        return (target, ...hooks) => {
            let callback;
            let action = target.getAction();
            if (action) {
                switch (action.type) {
                    case ActionType.OpenUrl:
                        callback = this.onOpenUrl;
                        break;
                    case ActionType.ShowCard:
                        callback = this.onShowCard;
                        break;
                    case ActionType.Submit:
                        callback = this.onSubmit;
                        break;
                }
                let args = {
                    action: action,
                    formValidate: true
                };
                if (this.globalHooks) {
                    args = this.globalHooks.reduce((prev, current) => {
                        return current(prev);
                    }, args);
                }
                if (hooks) {
                    args = hooks.reduce((prev, current) => {
                        return current(prev);
                    }, args);
                }
                if (callback && typeof callback === 'function') {
                    callback(args);
                }
            }
        };
    }
}
