import { ActionType } from '../Schema/Abstract/ActionElement';
import { OpenUrlActionElement } from '../Schema/Actions/OpenUrlAction';
import { ShowCardActionElement } from '../Schema/Actions/ShowCardAction';
import { SubmitActionElement } from '../Schema/Actions/SubmitAction';
import { IElement } from '../Schema/Interfaces/IElement';
import { CallbackAction } from '../Schema/Internal/CallbackAction';
import { ActionEventHandlerArgs } from '../Shared/Types';

export class HostContext {
    private onFocus?: (args?: ActionEventHandlerArgs<OpenUrlActionElement>) => void;
    private onBlur?: (args?: ActionEventHandlerArgs<OpenUrlActionElement>) => void;
    private onOpenUrl: (args?: ActionEventHandlerArgs<OpenUrlActionElement>) => void;
    private onShowCard: (args?: ActionEventHandlerArgs<ShowCardActionElement>) => void;
    private onSubmit: (args?: ActionEventHandlerArgs<SubmitActionElement>) => void;
    private onCallback: (args?: ActionEventHandlerArgs<CallbackAction>) => void;
    private hostRenderer: { [key: string]: ((data: any) => JSX.Element) } = {};

    private static sharedInstance: HostContext;

    private constructor() { }

    public static getInstance() {
        if (HostContext.sharedInstance === undefined) {
            HostContext.sharedInstance = new HostContext();
        }
        return HostContext.sharedInstance;
    }

    public registerFocusHandler(handler: (args?: ActionEventHandlerArgs<OpenUrlActionElement>) => void) {
        this.onFocus = handler;
    }

    public registerBlurHandler(handler: (args?: ActionEventHandlerArgs<OpenUrlActionElement>) => void) {
        this.onBlur = handler;
    }

    public registerOpenUrlHandler(handler: (args?: ActionEventHandlerArgs<OpenUrlActionElement>) => void) {
        this.onOpenUrl = handler;
    }

    public registerShowCardHandler(handler: (args?: ActionEventHandlerArgs<ShowCardActionElement>) => void) {
        this.onShowCard = handler;
    }

    public registerSubmitHandler(handler: (args?: ActionEventHandlerArgs<SubmitActionElement>) => void) {
        this.onSubmit = handler;
    }

    public registerCallbackHandler(handler: (args?: ActionEventHandlerArgs<CallbackAction>) => void) {
        this.onCallback = handler;
    }

    public registerHostRenderer(type: string, renderer: (data: any) => JSX.Element) {
        this.hostRenderer[type] = renderer;
    }

    public getHostRenderer(type: string) {
        return this.hostRenderer[type];
    }

    public getHandler(type: ActionType | 'focus' | 'blur') {
        let callback: (args?: ActionEventHandlerArgs<IElement>) => void;
        switch (type) {
            case ActionType.OpenUrl:
                callback = this.onOpenUrl;
                break;
            case ActionType.Callback:
                callback = this.onCallback;
                break;
            case ActionType.ShowCard:
                callback = this.onShowCard;
                break;
            case ActionType.Submit:
                callback = this.onSubmit;
                break;
            case 'focus':
                callback = this.onFocus;
                break;
            case 'blur':
                callback = this.onBlur;
                break;
        }
        return callback;
    }
}
