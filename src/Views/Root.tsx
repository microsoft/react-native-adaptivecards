import React from 'react';
import {
    Linking,
    View,
} from 'react-native';

import { CallbackAction } from 'Schema/Internal/CallbackAction';
import { ActionContext } from '../Contexts/ActionContext';
import { FormContext } from '../Contexts/FormContext';
import { HostContext } from '../Contexts/HostContext';
import { ActionType } from '../Schema/Abstract/ActionElement';
import { OpenUrlActionElement } from '../Schema/Actions/OpenUrlAction';
import { SubmitActionElement } from '../Schema/Actions/SubmitAction';
import { CardElement } from '../Schema/Cards/Card';
import { ActionEventHandlerArgs } from '../Shared/Types';
import { AdaptiveCardView } from './Cards/AdaptiveCard';

export interface IProps {
    adaptiveCard: any;
    onSubmit?: (data: any) => void;
    onOpenUrl?: (url: string) => void;
    onCallback?: (url: string, parameters: { [key: string]: string }) => Promise<any>;
    onFocus?: () => void;
    onBlur?: () => void;
}

interface IState {
    rootCard: CardElement;
}

export class CardRootView extends React.PureComponent<IProps, IState> {
    // private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        // Apply customized styles
        // this.styleConfig = StyleManager.getInstance().addStyle(props.overrideStyle);

        // State initialization
        this.state = {
            rootCard: new CardElement(this.props.adaptiveCard, undefined),
        };

        let hostContext = HostContext.getInstance();

        hostContext.registerOpenUrlHandler(this.onOpenUrl);
        hostContext.registerSubmitHandler(this.onSubmit);
        hostContext.registerCallbackHandler(this.onCallback);
        hostContext.registerFocusHandler(this.props.onFocus);
        hostContext.registerBlurHandler(this.props.onBlur);

        let actionContext = ActionContext.getGlobalInstance();

        actionContext.registerHook({
            func: this.validateForm,
            name: 'validateForm',
            actionType: ActionType.Submit
        });

        actionContext.registerHook({
            func: this.validateCallbackParams,
            name: 'validateCallbackParams',
            actionType: ActionType.Callback
        });

        actionContext.registerHook({
            func: this.populateFormData,
            name: 'populateFormData',
            actionType: ActionType.Submit
        });

        actionContext.registerHook({
            func: this.populateCallbackParamData,
            name: 'populateCallbackParamData',
            actionType: ActionType.Callback
        });
    }

    public static registerCustomElementRender(type: string, renderer: (data: any) => JSX.Element) {
        HostContext.getInstance().registerHostRenderer(type, renderer);
    }

    public componentWillReceiveProps(nextProps: IProps) {
        // Update customized styles
        // this.styleConfig = StyleManager.getInstance().addStyle(nextProps.overrideStyle);
    }

    public render() {
        return (
            <View
                style={{ flex: 1 }}
            >
                <AdaptiveCardView
                    vIndex={0}
                    hIndex={0}
                    element={this.state.rootCard}
                />
            </View>
        );
    }

    private onOpenUrl = (args: ActionEventHandlerArgs<OpenUrlActionElement>) => {
        // TODO: Is URL valid? Handle failure case
        if (args) {
            if (this.props.onOpenUrl) {
                this.props.onOpenUrl(args.action.url);
            } else {
                Linking.canOpenURL(args.action.url).then((supported) => {
                    if (supported) {
                        Linking.openURL(args.action.url);
                    }
                });
            }
        }
    }

    private onCallback = (args: ActionEventHandlerArgs<CallbackAction>) => {
        if (args) {
            console.log('Form validate: ' + args.formValidate);
            console.log(args.formData);
            if (args.formValidate && this.props.onCallback) {
                this.props.onCallback(args.action.url, args.formData).then((data) => {
                    if (args.onFinishCallback) {
                        args.onFinishCallback(data);
                    }
                }).catch((error) => {
                    if (args.onErrorCallback) {
                        args.onErrorCallback(error);
                    }
                });
            }
        }
    }

    private onSubmit = (args: ActionEventHandlerArgs<SubmitActionElement>) => {
        if (args) {
            console.log('Form validate: ' + args.formValidate);
            console.log(args.formData);
            if (args.formValidate && this.props.onSubmit) {
                this.props.onSubmit(args.formData);
            }
        }
    }

    private validateForm = (args: ActionEventHandlerArgs<SubmitActionElement>) => {
        if (args) {
            args.formValidate = args.action.scope.validateScope();
        }
        return args;
    }

    private validateCallbackParams = (args: ActionEventHandlerArgs<CallbackAction>) => {
        if (args) {
            args.formValidate = args.action.scope.validateScope();
        }
        return args;
    }

    private populateFormData = (args: ActionEventHandlerArgs<SubmitActionElement>) => {
        if (args && args.formValidate) {
            args.formData = {
                ...(args.action.data || {}),
                ...FormContext.getInstance().getFormData(args.action.scope.inputFields)
            };
        }
        return args;
    }

    private populateCallbackParamData = (args: ActionEventHandlerArgs<CallbackAction>) => {
        if (args && args.formValidate) {
            args.formData = FormContext.getInstance().getCallbackParamData(args.action.parameters);
        }
        return args;
    }
}
