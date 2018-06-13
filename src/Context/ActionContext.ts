import { OpenUrlActionElement } from '../Schema/Actions/OpenUrlAction';
import { ShowCardActionElement } from '../Schema/Actions/ShowCardAction';
import { SubmitActionElement } from '../Schema/Actions/SubmitAction';
import { ActionElement, ActionType } from '../Schema/Base/ActionElement';
import { CardElement } from '../Schema/Base/CardElement';

export class ActionEventHandlerArgs<T extends ActionElement> {
    formData?: { [id: string]: string };
    formValidate: boolean;
    action: T;
}

export class ActionContext {
    private static sharedInstance: ActionContext;
    private onOpenUrl: (args: ActionEventHandlerArgs<OpenUrlActionElement>) => void;
    private onShowCard: (args: ActionEventHandlerArgs<ShowCardActionElement>) => void;
    private onSubmit: (args: ActionEventHandlerArgs<SubmitActionElement>) => void;
    private globalHooks: ((args: ActionEventHandlerArgs<ActionElement>) => ActionEventHandlerArgs<ActionElement>)[] = [];

    private constructor() { }

    public static getInstance() {
        if (ActionContext.sharedInstance === undefined) {
            ActionContext.sharedInstance = new ActionContext();
        }
        return ActionContext.sharedInstance;
    }

    public registerOpenUrlHandler(handler: (args: ActionEventHandlerArgs<OpenUrlActionElement>) => void) {
        this.onOpenUrl = handler;
    }

    public registerShowCardHandler(handler: (args: ActionEventHandlerArgs<ShowCardActionElement>) => void) {
        this.onShowCard = handler;
    }

    public registerSubmitHandler(handler: (args: ActionEventHandlerArgs<SubmitActionElement>) => void) {
        this.onSubmit = handler;
    }

    public registerGlobalHook(hook: ((args: ActionEventHandlerArgs<ActionElement>) => ActionEventHandlerArgs<ActionElement>)) {
        this.globalHooks.push(hook);
    }

    public getActionEventHandler() {
        return (
            target: CardElement,
            ...hooks: ((args: ActionEventHandlerArgs<ActionElement>) => ActionEventHandlerArgs<ActionElement>)[]
        ) => {
            let callback: (args: ActionEventHandlerArgs<ActionElement>) => void;
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
