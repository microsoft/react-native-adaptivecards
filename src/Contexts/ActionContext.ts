import { OpenUrlActionElement } from '../Schema/Actions/OpenUrlAction';
import { ShowCardActionElement } from '../Schema/Actions/ShowCardAction';
import { SubmitActionElement } from '../Schema/Actions/SubmitAction';
import { AbstractElement } from '../Schema/Base/AbstractElement';
import { ActionElement, ActionType } from '../Schema/Base/ActionElement';
import { ActionEventHandlerArgs, ActionHook } from '../Shared/Types';

export class ActionContext {
    private onOpenUrl: (args: ActionEventHandlerArgs<OpenUrlActionElement>) => void;
    private onShowCard: (args: ActionEventHandlerArgs<ShowCardActionElement>) => void;
    private onSubmit: (args: ActionEventHandlerArgs<SubmitActionElement>) => void;
    private hooks: { [actionType: string]: ActionHook[] } = {};

    private static sharedInstance: ActionContext;

    public static createInstance() {
        return new ActionContext();
    }

    public static getGlobalInstance() {
        if (ActionContext.sharedInstance === undefined) {
            ActionContext.sharedInstance = ActionContext.createInstance();
        }
        return ActionContext.sharedInstance;
    }

    public static clearGlobalInstance() {
        ActionContext.sharedInstance = undefined;
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

    public registerHook(hook: ActionHook) {
        if (hook) {
            console.log('Register Hook: ' + hook.actionType);
            if (this.hooks[hook.actionType] === undefined) {
                this.hooks[hook.actionType] = [];
            }
            if (!this.hooks[hook.actionType].some(value => value.name === hook.name)) {
                this.hooks[hook.actionType].push(hook);
            }
        }
    }

    public getHooks(actionType: ActionType) {
        console.log(this.hooks);
        console.log(actionType);
        if (actionType) {
            return this.hooks[actionType];
        }
        return [];
    }

    public getActionEventHandler(target: AbstractElement) {
        return (
            (...externalHooks: ActionHook[]) => {
                let action = target.getAction();
                if (action) {
                    let callback = this.selectCallback(action);
                    let args = {
                        action: action,
                        formValidate: false,
                        target: target,
                    };
                    let hookFuncs = this.getExecuteFuncs(action.type, externalHooks);

                    args = hookFuncs.reduce((prev, current) => {
                        return current(prev);
                    }, args);

                    if (callback && typeof callback === 'function') {
                        callback(args);
                    }
                }
            }
        );
    }

    private selectCallback(action: ActionElement) {
        let callback: (args: ActionEventHandlerArgs<ActionElement>) => void;
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
        return callback;
    }

    private getExecuteFuncs(
        actionType: string,
        externalHooks: ActionHook[]
    ) {
        let hookFuncs: ((args: ActionEventHandlerArgs<ActionElement>) => ActionEventHandlerArgs<ActionElement>)[] = [];

        if (this.hooks) {
            let hookArrays = this.hooks[actionType];
            if (hookArrays === undefined) {
                hookArrays = [];
            }
            if (externalHooks) {
                hookArrays = hookArrays.concat(externalHooks);
            }
            hookFuncs = hookFuncs.concat(
                hookArrays.reduce((prev, current) => {
                    return prev.concat(current.func);
                }, [])
            );
        }
        return hookFuncs;
    }
}
