import { TreeNode } from '../Shared/Types';
import { FormStore } from './FormStore';
import { SchemaStore } from './SchemaStore';
export class CardContext extends TreeNode {
    constructor(parent) {
        super(parent);
        this.children = [];
        if (parent) {
            this.form = parent.form;
            this.schemas = parent.schemas;
            parent.children.push(this);
        }
        else {
            this.form = FormStore.createInstance();
            this.schemas = SchemaStore.createInstance();
        }
    }
    static createInstance(parent) {
        return new CardContext(parent);
    }
    registerErrorHandler(handler) {
        this.onError = handler;
    }
    registerInfoHandler(handler) {
        this.onInfo = handler;
    }
    registerWarningHandler(handler) {
        this.onWarning = handler;
    }
    registerFocusHandler(handler) {
        this.onFocus = handler;
    }
    registerBlurHandler(handler) {
        this.onBlur = handler;
    }
    registerOpenUrlActionHandler(handler) {
        this.onOpenUrlAction = handler;
    }
    registerShowCardActionHandler(handler) {
        this.onShowCardAction = handler;
    }
    registerSubmitActionHandler(handler) {
        this.onSubmitAction = handler;
    }
    registerCallbackActionHandler(handler) {
        this.onCallbackAction = handler;
    }
    registerSelectActionHandler(handler) {
        this.onSelectAction = handler;
    }
    findRequiredContext(selector) {
        if (selector) {
            if (selector(this)) {
                return this;
            }
            if (this.parent) {
                return this.parent.findRequiredContext(selector);
            }
        }
        return undefined;
    }
    get errorHandler() {
        let context = this.findRequiredContext(context => context.onError !== undefined);
        if (context) {
            return context.onError;
        }
        return undefined;
    }
    get infoHandler() {
        let context = this.findRequiredContext(context => context.onInfo !== undefined);
        if (context) {
            return context.onInfo;
        }
        return undefined;
    }
    get warningHandler() {
        let context = this.findRequiredContext(context => context.onWarning !== undefined);
        if (context) {
            return context.onWarning;
        }
        return undefined;
    }
    get focusHandler() {
        let context = this.findRequiredContext(context => context.onFocus !== undefined);
        if (context) {
            return context.onFocus;
        }
        return undefined;
    }
    get blurHandler() {
        let context = this.findRequiredContext(context => context.onBlur !== undefined);
        if (context) {
            return context.onBlur;
        }
        return undefined;
    }
    get openUrlActionHandler() {
        let context = this.findRequiredContext(context => context.onOpenUrlAction !== undefined);
        if (context) {
            return context.onOpenUrlAction;
        }
        return undefined;
    }
    get showCardActionHandler() {
        let context = this.findRequiredContext(context => context.onShowCardAction !== undefined);
        if (context) {
            return context.onShowCardAction;
        }
        return undefined;
    }
    get submitActionHandler() {
        let context = this.findRequiredContext(context => context.onSubmitAction !== undefined);
        if (context) {
            return context.onSubmitAction;
        }
        return undefined;
    }
    get callbackActionHandler() {
        let context = this.findRequiredContext(context => context.onCallbackAction !== undefined);
        if (context) {
            return context.onCallbackAction;
        }
        return undefined;
    }
    get selectActionHandler() {
        let context = this.findRequiredContext(context => context.onSelectAction !== undefined);
        if (context) {
            return context.onSelectAction;
        }
        return undefined;
    }
}
