import { ActionType } from '../Schema/Base/ActionElement';
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
    registerOpenUrlHandler(handler) {
        this.onOpenUrl = handler;
    }
    registerShowCardHandler(handler) {
        this.onShowCard = handler;
    }
    registerSubmitHandler(handler) {
        this.onSubmit = handler;
    }
    registerHook(hook) {
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
    getHooks(actionType) {
        console.log(this.hooks);
        console.log(actionType);
        if (actionType) {
            return this.hooks[actionType];
        }
        return [];
    }
    getActionEventHandler(target) {
        return ((...externalHooks) => {
            let action = target.getAction();
            if (action) {
                let callback = this.selectCallback(action);
                let args = {
                    action: action,
                    formValidate: false,
                    target: target,
                };
                let hookFuncs = this.getExcuteFuncs(action.type, externalHooks);
                args = hookFuncs.reduce((prev, current) => {
                    return current(prev);
                }, args);
                if (callback && typeof callback === 'function') {
                    callback(args);
                }
            }
        });
    }
    selectCallback(action) {
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
        return callback;
    }
    getExcuteFuncs(actionType, externalHooks) {
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
