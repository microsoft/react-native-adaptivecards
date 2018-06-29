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
        this.onShowCard = (args) => {
            if (args) {
                if (!this.isComponentUnmounted) {
                    this.setState({
                        actionCard: args.action.card,
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
        this.formValidation = (args) => {
            if (args) {
                args.formValidate = args.target.getForm().validateForm();
            }
            return args;
        };
        this.populateFormData = (args) => {
            if (args && args.formValidate) {
                args.formData = Object.assign({}, args.action.getData(), FormContext.getInstance().getFormData(args.target.getForm().getAllInputFieldIds()));
            }
            return args;
        };
        this.state = {
            rootCard: new CardElement(this.props.adaptiveCard, undefined),
            actionCard: null,
        };
        let actionContext = ActionContext.getGlobalInstance();
        actionContext.registerOpenUrlHandler(this.onOpenUrl);
        actionContext.registerShowCardHandler(this.onShowCard);
        actionContext.registerSubmitHandler(this.onSubmit);
        actionContext.registerHook({ func: this.formValidation, name: 'formValidation', actionType: ActionType.Submit });
        actionContext.registerHook({ func: this.populateFormData, name: 'populateFormData', actionType: ActionType.Submit });
    }
    componentWillReceiveProps(nextProps) {
    }
    componentWillUnmount() {
        this.isComponentUnmounted = true;
    }
    render() {
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(AdaptiveCardView, { vIndex: 0, hIndex: 0, element: this.state.rootCard })));
    }
}
