import React from 'react';
import { Linking, View, } from 'react-native';
import { ActionContext } from '../Contexts/ActionContext';
import { FormContext } from '../Contexts/FormContext';
import { HostContext } from '../Contexts/HostContext';
import { HostRenderer } from '../HostRenderer/HostRenderer';
import { ActionType } from '../Schema/Abstract/ActionElement';
import { CardElement } from '../Schema/Cards/Card';
import { AdaptiveCardView } from './Cards/AdaptiveCard';
export class CardRootView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onOpenUrl = (args) => {
            if (args) {
                if (this.props.onOpenUrl) {
                    this.props.onOpenUrl(args.action.url);
                }
                else {
                    Linking.canOpenURL(args.action.url).then((supported) => {
                        if (supported) {
                            Linking.openURL(args.action.url);
                        }
                    });
                }
            }
        };
        this.onCallback = (args) => {
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
        };
        this.onSubmit = (args) => {
            if (args) {
                console.log('Form validate: ' + args.formValidate);
                console.log(args.formData);
                if (args.formValidate && this.props.onSubmit) {
                    this.props.onSubmit(args.formData);
                }
            }
        };
        this.validateForm = (args) => {
            if (args) {
                args.formValidate = args.action.scope.validateScope();
            }
            return args;
        };
        this.validateCallbackParams = (args) => {
            if (args) {
                args.formValidate = args.action.scope.validateScope();
            }
            return args;
        };
        this.populateFormData = (args) => {
            if (args && args.formValidate) {
                args.formData = Object.assign({}, (args.action.data || {}), FormContext.getInstance().getFormData(args.action.scope.inputFields));
            }
            return args;
        };
        this.populateCallbackParamData = (args) => {
            if (args && args.formValidate) {
                args.formData = FormContext.getInstance().getCallbackParamData(args.action.parameters);
            }
            return args;
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
    static registerSVGRenderer(renderer) {
        HostContext.getInstance().registerHostRenderer(HostRenderer.SVG, renderer);
    }
    render() {
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(AdaptiveCardView, { vIndex: 0, hIndex: 0, element: new CardElement(this.props.adaptiveCard, undefined), style: this.props.style })));
    }
}
