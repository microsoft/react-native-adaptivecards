import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';

import ImageBackground from './Shared/ImageBackground';
import StyleConfig from './Style/styleConfig.d';
import styleManager from './Style/styleManager';
import AdaptiveCard from '../Schema/AdaptiveCard';
import Action from '../Schema/Actions/Action';
import CardElement from '../Schema/Elements/CardElement';
import ActionView from './Actions/ActionView';
import CardElementView from './Elements/CardElementView';

interface IProps {
    adaptiveCard: any;
    onShowCard?: { (card: AdaptiveCard): void };
    style?: ViewStyle;
}
interface IState {
}

export default class AdaptiveCardView extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: StyleConfig;
    private adaptiveCard: AdaptiveCard;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = styleManager.getStyle();

        // Serialize given JSON data
        this.adaptiveCard = new AdaptiveCard(props.adaptiveCard);
        console.log('AdaptiveCard', this.adaptiveCard);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.adaptiveCard) {
            this.adaptiveCard = new AdaptiveCard(nextProps.adaptiveCard);
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
            return <ImageBackground
                containerStyle={cardStyle}
                imageStyle={{
                    borderRadius: this.styleConfig.card.borderRadius,
                }}
                source={{ uri: this.adaptiveCard.backgroundImage }}>
                <View style={{ flex: 1, padding: this.styleConfig.card.padding }}>
                    {this.renderBody()}
                    {this.renderActions()}
                </View>
            </ImageBackground>;
        } else {
            return <View style={[cardStyle, {
                padding: this.styleConfig.card.padding,
            }]}>
                {this.renderBody()}
                {this.renderActions()}
            </View>;
        }
    }

    private renderBody(): JSX.Element {
        if (!this.adaptiveCard.hasBody()) {
            return null;
        }

        return <View style={{ flex: 1 }}>
            {
                this.adaptiveCard.body.map((cardElement: CardElement, index: number) =>
                    <CardElementView
                        key={'body' + index}
                        index={index}
                        cardElement={cardElement}
                    />
                )
            }
        </View>;
    }

    private renderActions(): JSX.Element {
        if (!this.adaptiveCard.hasActions()) {
            return null;
        }

        return <View style={{
            flex: 1,
            flexDirection: styleManager.getActionSetFlexDirectionValue(),
            alignItems: 'stretch',
            marginTop: this.styleConfig.action.actionSet.spacing,
        }}>
            {
                this.adaptiveCard.actions.map((action: Action, index: number) =>
                    <ActionView
                        key={'action' + index}
                        index={index}
                        action={action}
                        onShowCard={this.props.onShowCard}
                    />
                )
            }
        </View>;
    }
}
