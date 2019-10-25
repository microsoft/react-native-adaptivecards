import { ReactNode } from 'react';
import { CardModel } from '../Models/Cards/Card';
import { TreeNode } from '../Shared/Types';
import { FormStore } from './FormStore';
import { SchemaStore } from './SchemaStore';

export class CardContext extends TreeNode<CardContext> {
    private onError?: (error: any) => void;
    private onInfo?: (info: any) => void;
    private onWarning?: (warning: any) => void;
    private onFocus?: () => void;
    private onBlur?: () => void;
    private onOpenUrlAction?: (url: string, method: string, data: any) => Promise<any>;
    private onShowCardAction?: (card: CardModel) => Promise<any>;
    private onSubmitAction?: (data: any) => Promise<any>;
    private onCallbackAction?: (url: string, parameters: { [key: string]: string }) => Promise<any>;
    private onSelectAction?: (data: any) => Promise<any>;
    private avatarFallbackRender?: (diameter: number, altText: string, url: string) => ReactNode;
    private calendarFallbackRender?: (rawEvents: string) => ReactNode;
    public readonly form: FormStore;
    public readonly schemas: SchemaStore;
    public readonly children: CardContext[] = [];
    public fit: 'content' | 'background';

    private constructor(parent?: CardContext) {
        super(parent);
        if (parent) {
            this.form = parent.form;
            this.schemas = parent.schemas;
            parent.children.push(this);
        } else {
            this.form = FormStore.createInstance();
            this.schemas = SchemaStore.createInstance();
        }
    }

    public static createInstance(parent?: CardContext) {
        return new CardContext(parent);
    }

    public registerErrorHandler(handler: (error: any) => void) {
        this.onError = handler;
    }

    public registerInfoHandler(handler: (info: any) => void) {
        this.onInfo = handler;
    }

    public registerWarningHandler(handler: (warning: any) => void) {
        this.onWarning = handler;
    }

    public registerFocusHandler(handler: () => void) {
        this.onFocus = handler;
    }

    public registerBlurHandler(handler: () => void) {
        this.onBlur = handler;
    }

    public registerOpenUrlActionHandler(handler: (url: string, method: string, data: any) => Promise<any>) {
        this.onOpenUrlAction = handler;
    }

    public registerShowCardActionHandler(handler: (card: CardModel) => Promise<any>) {
        this.onShowCardAction = handler;
    }

    public registerSubmitActionHandler(handler: (data: any) => Promise<any>) {
        this.onSubmitAction = handler;
    }

    public registerCallbackActionHandler(handler: (url: string, parameters: { [key: string]: string }) => Promise<any>) {
        this.onCallbackAction = handler;
    }

    public registerSelectActionHandler(handler: (data: any) => Promise<any>) {
        this.onSelectAction = handler;
    }

    public registerAvatarFallbackRenderHandler(handler: (diameter: number, altText: string, url: string) => ReactNode) {
        this.avatarFallbackRender = handler;
    }

    public registerCalendarFallbackRenderHandler(handler: (rawEvents: string) => ReactNode) {
        this.calendarFallbackRender = handler;
    }

    private findRequiredContext(selector: (context: CardContext) => boolean): CardContext {
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

    public get errorHandler(): (error: any) => void {
        let context = this.findRequiredContext(context => context.onError !== undefined);
        if (context) {
            return context.onError;
        }
        return undefined;
    }

    public get infoHandler(): (info: any) => void {
        let context = this.findRequiredContext(context => context.onInfo !== undefined);
        if (context) {
            return context.onInfo;
        }
        return undefined;
    }

    public get warningHandler(): (warning: any) => void {
        let context = this.findRequiredContext(context => context.onWarning !== undefined);
        if (context) {
            return context.onWarning;
        }
        return undefined;
    }

    public get focusHandler(): () => void {
        let context = this.findRequiredContext(context => context.onFocus !== undefined);
        if (context) {
            return context.onFocus;
        }
        return undefined;
    }

    public get blurHandler(): () => void {
        let context = this.findRequiredContext(context => context.onBlur !== undefined);
        if (context) {
            return context.onBlur;
        }
        return undefined;
    }

    public get openUrlActionHandler(): (url: string, method: string, data: any) => Promise<any> {
        let context = this.findRequiredContext(context => context.onOpenUrlAction !== undefined);
        if (context) {
            return context.onOpenUrlAction;
        }
        return undefined;
    }

    public get showCardActionHandler(): (card: CardModel) => Promise<any> {
        let context = this.findRequiredContext(context => context.onShowCardAction !== undefined);
        if (context) {
            return context.onShowCardAction;
        }
        return undefined;
    }

    public get submitActionHandler(): (data: any) => Promise<any> {
        let context = this.findRequiredContext(context => context.onSubmitAction !== undefined);
        if (context) {
            return context.onSubmitAction;
        }
        return undefined;
    }

    public get callbackActionHandler(): (url: string, parameters: { [key: string]: string }) => Promise<any> {
        let context = this.findRequiredContext(context => context.onCallbackAction !== undefined);
        if (context) {
            return context.onCallbackAction;
        }
        return undefined;
    }

    public get selectActionHandler(): (data: any) => Promise<any> {
        let context = this.findRequiredContext(context => context.onSelectAction !== undefined);
        if (context) {
            return context.onSelectAction;
        }
        return undefined;
    }

    public get avatarFallbackRenderHandler(): (diameter: number, altText: string, url: string) => ReactNode {
        let context = this.findRequiredContext(context => context.avatarFallbackRender !== undefined);
        if (context) {
            return context.avatarFallbackRender;
        }
        return undefined;
    }

    public get calendarFallbackRenderHandler(): (rawEvents: string) => ReactNode {
        let context = this.findRequiredContext(context => context.calendarFallbackRender !== undefined);
        if (context) {
            return context.calendarFallbackRender;
        }
        return undefined;
    }
}
