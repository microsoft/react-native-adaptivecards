import { ActionElement } from '../Schema/Actions/Action';
import { ActionType } from '../Schema/Actions/ActionType';
import { OpenUrlActionElement } from '../Schema/Actions/OpenUrlAction';
import { ShowCardActionElement } from '../Schema/Actions/ShowCardAction';
import { SubmitActionElement } from '../Schema/Actions/SubmitAction';

export class ActionContext {
    private static sharedInstance: ActionContext;
    private onOpenUrl: (action: OpenUrlActionElement) => void;
    private onShowCard: (action: ShowCardActionElement) => void;
    private onSubmit: (action: SubmitActionElement) => void;

    private constructor() { }

    public static getInstance() {
        if (ActionContext.sharedInstance === undefined) {
            ActionContext.sharedInstance = new ActionContext();
        }
        return ActionContext.sharedInstance;
    }

    public registerOpenUrlHandler(handler: (action: OpenUrlActionElement) => void) {
        this.onOpenUrl = handler;
    }

    public registerShowCardHandler(handler: (action: ShowCardActionElement) => void) {
        this.onShowCard = handler;
    }

    public registerSubmitHandler(handler: (action: ShowCardActionElement) => void) {
        this.onSubmit = handler;
    }

    public getActionHandler() {
        return (action: ActionElement) => {
            let callback: (action: OpenUrlActionElement | ShowCardActionElement | SubmitActionElement) => void;
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
