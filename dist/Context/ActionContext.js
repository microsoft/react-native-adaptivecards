import { ActionType } from '../Schema/Actions/ActionType';
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
    getActionHandler() {
        return (action) => {
            let callback;
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
            if (callback && typeof callback === 'function') {
                callback(action);
            }
        };
    }
}
