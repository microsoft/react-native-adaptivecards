import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';
import { ActionContext, ActionEventHandlerArgs } from '../../Context/ActionContext';
import { ShowCardActionElement } from '../../Schema/Actions/ShowCardAction';
import { ActionElement, ActionType } from '../../Schema/Base/ActionElement';
import { ContentElement } from '../../Schema/Base/ContentElement';
import { CardElement } from '../../Schema/Cards/Card';
import { DecCardElementView } from '../Basic/DecCardElementView';
import { ImageBackground } from '../Basic/ImageBackground';
import { ActionElementView } from '../Factories/ActionElementView';
import { ICardElementViewProps } from '../Shared/BaseProps';
import { StyleConfig } from '../Styles/StyleConfig';
import { StyleManager } from '../Styles/StyleManager';

interface IProps extends ICardElementViewProps<CardElement> {
    style?: ViewStyle;
}

interface IState {
    subCard?: CardElement;
}

export class CardView extends React.Component<IProps, IState> {
    private readonly styleConfig: StyleConfig;
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

        this.styleConfig = StyleManager.getInstance().getStyle();
    }

    public render(): JSX.Element {
        if (!this.props.element.isValid()) {
            // TODO: render error card
            return undefined;
        }

        const cardStyle: ViewStyle = Object.assign({
            flex: 1,
            backgroundColor: this.styleConfig.card.backgroundColor,
            borderWidth: this.styleConfig.card.borderWidth,
            borderColor: this.styleConfig.card.borderColor,
            borderRadius: this.styleConfig.card.borderRadius,
        }, this.props.style);

        if (this.props.element.backgroundImage) {
            return (
                <ImageBackground
                    containerStyle={cardStyle}
                    imageStyle={{
                        borderRadius: this.styleConfig.card.borderRadius,
                    }}
                    source={{ uri: this.props.element.backgroundImage }}
                >
                    <View
                        style={{ flex: 1, padding: this.styleConfig.card.padding }}
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
                    style={[cardStyle, {
                        padding: this.styleConfig.card.padding,
                    }]}
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
            <View
                style={{ flex: 1 }}
            >
                {
                    this.props.element.body.map((cardElement: ContentElement, index: number) =>
                        <DecCardElementView
                            key={'body' + index}
                            index={index}
                            element={cardElement}
                        />
                    )
                }
            </View>
        );
    }

    private renderActions() {
        if (!this.props.element.hasActions()) {
            return null;
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: StyleManager.getInstance().getActionSetFlexDirectionValue(),
                    alignItems: 'stretch',
                    marginTop: this.styleConfig.action.actionSet.spacing,
                }}
            >
                {
                    this.props.element.actions.map((action: ActionElement, index: number) =>
                        <ActionElementView
                            key={index}
                            element={action}
                            index={index}
                            actionContext={this.actionContext}
                        />
                    )
                }
            </View>
        );
    }

    private renderSubCard(): JSX.Element {
        if (this.state.subCard) {
            return (
                <CardView
                    element={this.state.subCard}
                    style={{
                        marginTop: this.styleConfig.card.spacing,
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
