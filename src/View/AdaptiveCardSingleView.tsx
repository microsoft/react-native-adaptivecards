import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';

import { ActionElement } from '../Schema/Actions/Action';
import { AdaptiveCardElement } from '../Schema/AdaptiveCard';
import { CardElement } from '../Schema/Elements/CardElement';
import { ActionView } from './Actions/ActionView';
import { CardElementView } from './Elements/CardElementView';
import { IFormProps } from './Shared/BaseProps';
import { ImageBackground } from './Shared/ImageBackground';
import { StyleConfig } from './Styles/StyleConfig';
import { styleManager } from './Styles/StyleManager';

interface IProps extends IFormProps {
    adaptiveCard: AdaptiveCardElement;
    style?: ViewStyle;
}
interface IState {
}

export class AdaptiveCardSingleView extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: StyleConfig;
    private adaptiveCard: AdaptiveCardElement;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = styleManager.getStyle();

        // Serialize given JSON data
        this.adaptiveCard = new AdaptiveCardElement(props.adaptiveCard);
        console.log('AdaptiveCard', this.adaptiveCard);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.adaptiveCard) {
            this.adaptiveCard = new AdaptiveCardElement(nextProps.adaptiveCard);
        }
    }

    render(): JSX.Element {
        if (!this.adaptiveCard.isValid()) {
            // TODO: render error card
            return null;
        }

        const cardStyle: ViewStyle = Object.assign({
            flex: 1,
            backgroundColor: this.styleConfig.card.backgroundColor,
            borderWidth: this.styleConfig.card.borderWidth,
            borderColor: this.styleConfig.card.borderColor,
            borderRadius: this.styleConfig.card.borderRadius,
        }, this.props.style);

        if (this.adaptiveCard.backgroundImage) {
            return (
                <ImageBackground
                    containerStyle={cardStyle}
                    imageStyle={{
                        borderRadius: this.styleConfig.card.borderRadius,
                    }}
                    source={{ uri: this.adaptiveCard.backgroundImage }}
                >
                    <View
                        style={{ flex: 1, padding: this.styleConfig.card.padding }}
                    >
                        {this.renderBody()}
                        {this.renderActions()}
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
                </View>
            );
        }
    }

    private renderBody(): JSX.Element {
        if (!this.adaptiveCard.hasBody()) {
            return null;
        }
        return (
            <View
                style={{ flex: 1 }}
            >
                {
                    this.adaptiveCard.body.map((cardElement: CardElement, index: number) =>
                        <CardElementView
                            key={'body' + index}
                            index={index}
                            cardElement={cardElement}
                        />
                    )
                }
            </View>
        );
    }

    private renderActions(): JSX.Element {
        if (!this.adaptiveCard.hasActions()) {
            return null;
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: styleManager.getActionSetFlexDirectionValue(),
                    alignItems: 'stretch',
                    marginTop: this.styleConfig.action.actionSet.spacing,
                }}
            >
                {
                    this.adaptiveCard.actions.map((action: ActionElement, index: number) =>
                        <ActionView
                            key={index}
                            action={action}
                            index={index}
                        />
                    )
                }
            </View>
        );
    }
}
