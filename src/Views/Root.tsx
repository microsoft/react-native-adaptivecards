import React from 'react';
import {
    Linking,
    View,
} from 'react-native';

import { ActionContext } from '../Contexts/ActionContext';
import { FormContext } from '../Contexts/FormContext';
import { OpenUrlActionElement } from '../Schema/Actions/OpenUrlAction';
import { SubmitActionElement } from '../Schema/Actions/SubmitAction';
import { ActionType } from '../Schema/Base/ActionElement';
import { CardElement } from '../Schema/Cards/Card';
import { ActionEventHandlerArgs } from '../Shared/Types';
import { AdaptiveCardView } from './Cards/AdaptiveCard';

export interface IProps {
    adaptiveCard: any;
    onSubmit?: (data: any) => void;
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

        let actionContext = ActionContext.getGlobalInstance();
        actionContext.registerOpenUrlHandler(this.onOpenUrl);
        actionContext.registerSubmitHandler(this.onSubmit);

        actionContext.registerHook({ func: this.formValidation, name: 'formValidation', actionType: ActionType.Submit });
        actionContext.registerHook({ func: this.populateFormData, name: 'populateFormData', actionType: ActionType.Submit });
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
            Linking.canOpenURL(args.action.url).then((supported) => {
                if (supported) {
                    Linking.openURL(args.action.url);
                }
            });
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

    private formValidation = (args: ActionEventHandlerArgs<SubmitActionElement>) => {
        if (args) {
            args.formValidate = args.action.scope.validateForm();
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
}
