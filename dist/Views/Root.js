import React from 'react';
import { Linking, View, } from 'react-native';
import { ActionContext } from '../Contexts/ActionContext';
import { FormContext } from '../Contexts/FormContext';
import { ActionType } from '../Schema/Base/ActionElement';
import { CardElement } from '../Schema/Cards/Card';
import { AdaptiveCardView } from './Cards/AdaptiveCard';
export class CardRootView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onOpenUrl = (args) => {
            if (args) {
                Linking.canOpenURL(args.action.url).then((supported) => {
                    if (supported) {
                        Linking.openURL(args.action.url);
                    }
                });
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
        this.formValidation = (args) => {
            if (args) {
                args.formValidate = args.action.scope.validateForm();
            }
            return args;
        };
        this.populateFormData = (args) => {
            if (args && args.formValidate) {
                args.formData = Object.assign({}, (args.action.data || {}), FormContext.getInstance().getFormData(args.action.scope.inputFields));
            }
            return args;
        };
        this.state = {
            rootCard: new CardElement(this.props.adaptiveCard, undefined),
        };
        let actionContext = ActionContext.getGlobalInstance();
        actionContext.registerOpenUrlHandler(this.onOpenUrl);
        actionContext.registerSubmitHandler(this.onSubmit);
        actionContext.registerHook({ func: this.formValidation, name: 'formValidation', actionType: ActionType.Submit });
        actionContext.registerHook({ func: this.populateFormData, name: 'populateFormData', actionType: ActionType.Submit });
    }
    componentWillReceiveProps(nextProps) {
    }
    render() {
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(AdaptiveCardView, { vIndex: 0, hIndex: 0, element: this.state.rootCard })));
    }
}
