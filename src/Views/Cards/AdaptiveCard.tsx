import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';

import { ImageBackground } from '../../Components/Basic/ImageBackground';
import { Column } from '../../Components/Containers/Column';
import { Row } from '../../Components/Containers/Row';
import { ActionContext, ActionEventHandlerArgs } from '../../Contexts/ActionContext';
import { ShowCardActionElement } from '../../Schema/Actions/ShowCardAction';
import { ActionElement, ActionType } from '../../Schema/Base/ActionElement';
import { ContentElement } from '../../Schema/Base/ContentElement';
import { CardElement } from '../../Schema/Cards/Card';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentFactory } from '../Factories/ContentFactory';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<CardElement> {
    style?: ViewStyle;
}

interface IState {
    subCard?: CardElement;
}

export class AdaptiveCardView extends React.Component<IProps, IState> {
    private actionContext: ActionContext;

    constructor(props: IProps) {
        super(props);

        this.state = {};

        this.actionContext = ActionContext.createInstance();
        this.actionContext.registerHook({
            func: this.showSubCard,
            name: 'showSubCard',
            actionType: ActionType.ShowCard
        });
    }

    public render(): JSX.Element {
        if (!this.props.element.isValid()) {
            // TODO: render error card
            return undefined;
        }

        const cardStyle: ViewStyle = Object.assign({
            flex: 1,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#777777',
            borderRadius: 4,
        }, this.props.style);

        if (this.props.element.backgroundImage) {
            return (
                <ImageBackground
                    containerStyle={cardStyle}
                    imageStyle={{
                        borderRadius: 4,
                    }}
                    source={{ uri: this.props.element.backgroundImage }}
                >
                    <View
                        style={{ flex: 1, padding: 10 }}
                    >
                        {this.renderBody()}
                        {this.renderActions()}
                        {this.renderSubCard()}
                    </View>
                </ImageBackground>
            );
        } else {
            return (
                <View
                    style={[
                        cardStyle,
                        {
                            padding: 20,
                        }
                    ]}
                >
                    {this.renderBody()}
                    {this.renderActions()}
                    {this.renderSubCard()}
                </View>
            );
        }
    }

    private renderBody(): JSX.Element {
        if (!this.props.element.hasBody()) {
            return null;
        }
        return (
            <Column
                vIndex={0}
                hIndex={0}
                width='stretch'
            >
                {
                    this.props.element.body.map((contentElement: ContentElement, index: number) =>
                        ContentFactory.createView(contentElement, index)
                    )
                }
            </Column>
        );
    }

    private renderActions() {
        if (!this.props.element.hasActions()) {
            return null;
        }

        return (
            this.props.element.actions.map((action: ActionElement, index: number) => (
                <Row
                    key={'ActionRow' + index}
                    vIndex={index + 1}
                    hIndex={0}
                    spacing={10}
                >
                    {ActionFactory.createAction(action, 0, this.actionContext)}
                </Row>
            ))
        );
    }

    private renderSubCard(): JSX.Element {
        if (this.state.subCard) {
            return (
                <AdaptiveCardView
                    vIndex={2}
                    hIndex={0}
                    element={this.state.subCard}
                    style={{
                        marginTop: 10,
                    }}
                />
            );
        }
        return undefined;
    }

    private showSubCard = (args: ActionEventHandlerArgs<ShowCardActionElement>) => {
        console.log('Show Card');
        if (args && args.action && args.action.getActionType() === ActionType.ShowCard) {
            if (this.state.subCard !== args.action.card) {
                this.setState({
                    subCard: args.action.card
                });
            } else {
                this.setState({
                    subCard: undefined
                });
            }
        }
        return args;
    }
}
