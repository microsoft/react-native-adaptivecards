import { ActionElement, ActionType } from '../Schema/Abstract/ActionElement';
import { ActionEventHandlerArgs, ActionHook } from '../Shared/Types';
import { HostContext } from './HostContext';

export class ActionContext {
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

    public registerHook(hook: ActionHook) {
        if (hook) {
            if (this.hooks[hook.actionType] === undefined) {
                this.hooks[hook.actionType] = [];
            }
            if (!this.hooks[hook.actionType].some(value => value.name === hook.name)) {
                this.hooks[hook.actionType].push(hook);
            }
        }
    }

    public getHooks(actionType: ActionType) {
        if (actionType) {
            return this.hooks[actionType];
        }
        return [];
    }

    public getActionEventHandler(target: ActionElement, onFinish?: (data: any) => void, onError?: (error: any) => void) {
        return (
            (...externalHooks: ActionHook[]) => {
                let action = target.action;
                if (action) {
                    let callback = HostContext.getInstance().getHandler(action.type as ActionType);
                    let args = {
                        action: action,
                        formValidate: false,
                        onFinishCallback: onFinish,
                        onErrorCallback: onError,
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
