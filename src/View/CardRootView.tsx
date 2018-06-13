import React from 'react';
import {
    Linking,
    View,
} from 'react-native';

import { ActionContext, ActionEventHandlerArgs } from '../Context/ActionContext';
import { OpenUrlActionElement } from '../Schema/Actions/OpenUrlAction';
import { ShowCardActionElement } from '../Schema/Actions/ShowCardAction';
import { SubmitActionElement } from '../Schema/Actions/SubmitAction';
import { AdaptiveCardElement } from '../Schema/Cards/AdaptiveCard';
import { AdaptiveCardView } from './Cards/AdaptiveCardView';
import { StyleConfig } from './Styles/StyleConfig';
import { styleManager } from './Styles/StyleManager';

export interface IProps {
    adaptiveCard: AdaptiveCardElement;
    overrideStyle?: StyleConfig;
    onSubmit?: (data: any) => void;
}

interface IState {
    actionCard: AdaptiveCardElement;
}

export class CardRootView extends React.PureComponent<IProps, IState> {
    private styleConfig: StyleConfig;
    private isComponentUnmounted: Boolean;

    constructor(props: IProps) {
        super(props);

        // Apply customized styles
        this.styleConfig = styleManager.addStyle(props.overrideStyle);

        // State initialization
        this.state = {
            actionCard: null,
        };

        let actionContext = ActionContext.getInstance();
        actionContext.registerOpenUrlHandler(this.onOpenUrl);
        actionContext.registerShowCardHandler(this.onShowCard);
        actionContext.registerSubmitHandler(this.onSubmit);
    }

    componentWillReceiveProps(nextProps: IProps) {
        // Update customized styles
        this.styleConfig = styleManager.addStyle(nextProps.overrideStyle);
    }

    componentWillUnmount() {
        this.isComponentUnmounted = true;
    }

    render(): JSX.Element {
        const { adaptiveCard } = this.props;

        if (!adaptiveCard) {
            // TODO: render error card
            return null;
        }

        return (
            <View
                style={{ flex: 1 }}
            >
                <AdaptiveCardView
                    formId='root'
                    element={adaptiveCard}
                />
                {
                    this.state.actionCard ?
                        <AdaptiveCardView
                            formId='first'
                            element={this.state.actionCard}
                            style={{
                                marginTop: this.styleConfig.card.spacing,
                            }}
                        />
                        :
                        null
                }
            </View>
        );
    }

    private onOpenUrl = (args: ActionEventHandlerArgs<OpenUrlActionElement>) => {
        // TODO: Is URL valid? Handle failure case
        Linking.canOpenURL(args.action.url).then((supported) => {
            if (supported) {
                Linking.openURL(args.action.url);
            }
        });
    }

    private onShowCard = (args: ActionEventHandlerArgs<ShowCardActionElement>) => {
        if (!this.isComponentUnmounted) {
            this.setState({
                actionCard: args.action.card,
            });
        }
    }

    private onSubmit = (args: ActionEventHandlerArgs<SubmitActionElement>) => {
        console.log('Form validate: ' + args.formValidate);
        console.log(args.formData);
        if (args.formValidate && this.props.onSubmit) {
            this.props.onSubmit(args.formData);
        }
    }
}
