import { HostContext } from './HostContext';
export class ActionContext {
    constructor() {
        this.hooks = {};
    }
    static createInstance() {
        return new ActionContext();
    }
    static getGlobalInstance() {
        if (ActionContext.sharedInstance === undefined) {
            ActionContext.sharedInstance = ActionContext.createInstance();
        }
        return ActionContext.sharedInstance;
    }
    static clearGlobalInstance() {
        ActionContext.sharedInstance = undefined;
    }
    registerHook(hook) {
        if (hook) {
            if (this.hooks[hook.actionType] === undefined) {
                this.hooks[hook.actionType] = [];
            }
            if (!this.hooks[hook.actionType].some(value => value.name === hook.name)) {
                this.hooks[hook.actionType].push(hook);
            }
        }
    }
    getHooks(actionType) {
        if (actionType) {
            return this.hooks[actionType];
        }
        return [];
    }
    getActionEventHandler(target, onFinish, onError) {
        return ((...externalHooks) => {
            let action = target.action;
            if (action) {
                let callback = HostContext.getInstance().getHandler(action.type);
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
        });
    }
    getExecuteFuncs(actionType, externalHooks) {
        let hookFuncs = [];
        if (this.hooks) {
            let hookArrays = this.hooks[actionType];
            if (hookArrays === undefined) {
                hookArrays = [];
            }
            if (externalHooks) {
                hookArrays = hookArrays.concat(externalHooks);
            }
            hookFuncs = hookFuncs.concat(hookArrays.reduce((prev, current) => {
                return prev.concat(current.func);
            }, []));
        }
        return hookFuncs;
    }
}
