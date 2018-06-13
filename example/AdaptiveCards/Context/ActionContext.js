import { ActionType } from '../Schema/Base/ActionElement';
export class ActionEventHandlerArgs {
}
export class ActionContext {
    constructor() { }
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
                    action: action
                };
                if (hooks) {
                    hooks.reduce((prev, current) => {
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
