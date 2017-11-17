import React from 'react';
import { View, } from 'react-native';
import ImageBackground from './Shared/ImageBackground';
import styleManager from './Style/styleManager';
import AdaptiveCard from '../Schema/AdaptiveCard';
import ActionView from './Actions/ActionView';
import CardElementView from './Elements/CardElementView';
export default class AdaptiveCardView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.styleConfig = styleManager.getStyle();
        this.adaptiveCard = new AdaptiveCard(props.adaptiveCard);
        console.log('AdaptiveCard', this.adaptiveCard);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.adaptiveCard) {
            this.adaptiveCard = new AdaptiveCard(nextProps.adaptiveCard);
        }
    }
    render() {
        if (!this.adaptiveCard.isValid()) {
            return null;
        }
        const cardStyle = Object.assign({
            flex: 1,
            backgroundColor: this.styleConfig.card.backgroundColor,
            borderWidth: this.styleConfig.card.borderWidth,
            borderColor: this.styleConfig.card.borderColor,
            borderRadius: this.styleConfig.card.borderRadius,
        }, this.props.style);
        if (this.adaptiveCard.backgroundImage) {
            return React.createElement(ImageBackground, { containerStyle: cardStyle, imageStyle: {
                    borderRadius: this.styleConfig.card.borderRadius,
                }, source: { uri: this.adaptiveCard.backgroundImage } },
                React.createElement(View, { style: { flex: 1, padding: this.styleConfig.card.padding } },
                    this.renderBody(),
                    this.renderActions()));
        }
        else {
            return React.createElement(View, { style: [cardStyle, {
                        padding: this.styleConfig.card.padding,
                    }] },
                this.renderBody(),
                this.renderActions());
        }
    }
    renderBody() {
        if (!this.adaptiveCard.hasBody()) {
            return null;
        }
        return React.createElement(View, { style: { flex: 1 } }, this.adaptiveCard.body.map((cardElement, index) => React.createElement(CardElementView, { key: 'body' + index, index: index, cardElement: cardElement })));
    }
    renderActions() {
        if (!this.adaptiveCard.hasActions()) {
            return null;
        }
        return React.createElement(View, { style: {
                flex: 1,
                flexDirection: styleManager.getActionSetFlexDirectionValue(),
                alignItems: 'stretch',
                marginTop: this.styleConfig.action.actionSet.spacing,
            } }, this.adaptiveCard.actions.map((action, index) => React.createElement(ActionView, { key: 'action' + index, index: index, action: action, onShowCard: this.props.onShowCard })));
    }
}
