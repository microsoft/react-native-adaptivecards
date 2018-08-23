import React from 'react';
import { Linking, View, } from 'react-native';
import { ActionContext } from '../Contexts/ActionContext';
import { FormContext } from '../Contexts/FormContext';
import { HostContext } from '../Contexts/HostContext';
import { ActionType } from '../Schema/Abstract/ActionElement';
import { CardElement } from '../Schema/Cards/Card';
import { StyleManager } from '../Styles/StyleManager';
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
                    console.log('Calling Callback');
                    this.props.onCallback(args.action.url, args.formData).then((data) => {
                        if (args.onFinishCallback) {
                            console.log('Has on Callback');
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
        this.onSelectAction = (args) => {
            if (args) {
                let currentValue = JSON.parse(FormContext.getInstance().getFieldValue(args.action.targetFormField));
                if (currentValue) {
                    currentValue.push(args.formData);
                    FormContext.getInstance().updateField(args.action.targetFormField, JSON.stringify(currentValue), true);
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
        this.populateSelectActionData = (args) => {
            if (args) {
                args.formData = Object.assign({}, (args.action.data || {}));
            }
            return args;
        };
        let hostContext = HostContext.getInstance();
        console.log(StyleManager.getColor('accent', 'default', false));
        hostContext.applyConfig(this.props.config);
        hostContext.registerOpenUrlHandler(this.onOpenUrl);
        hostContext.registerSubmitHandler(this.onSubmit);
        hostContext.registerCallbackHandler(this.onCallback);
        hostContext.registerSelectActionHandler(this.onSelectAction);
        hostContext.registerFocusHandler(this.props.onFocus);
        hostContext.registerBlurHandler(this.props.onBlur);
        hostContext.registerErrorHandler(this.props.onError);
        hostContext.registerInfoHandler(this.props.onInfo);
        hostContext.registerWarningHandler(this.props.onWarning);
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
            func: this.populateSelectActionData,
            name: 'populateSelectActionData',
            actionType: ActionType.Select
        });
    }
    render() {
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(AdaptiveCardView, { index: 0, element: new CardElement(this.props.adaptiveCard, undefined), theme: 'default', style: this.props.style })));
    }
}
