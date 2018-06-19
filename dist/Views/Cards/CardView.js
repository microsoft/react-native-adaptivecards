import React from 'react';
import { View, } from 'react-native';
import { ActionContext } from '../../Context/ActionContext';
import { ActionType } from '../../Schema/Base/ActionElement';
import { ImageBackground } from '../Basic/ImageBackground';
import { ActionElementView } from '../Factories/ActionElementView';
import { ContentElementView } from '../Factories/ContentElementView';
import { DecStyleManager } from '../Styles/DecStyleManager';
export class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.showSubCard = (args) => {
            console.log('Show Card');
            if (args && args.action && args.action.getActionType() === ActionType.ShowCard) {
                if (this.state.subCard !== args.action.card) {
                    this.setState({
                        subCard: args.action.card
                    });
                }
                else {
                    this.setState({
                        subCard: undefined
                    });
                }
            }
            return args;
        };
        this.state = {};
        this.actionContext = ActionContext.createInstance();
        this.actionContext.registerHook({
            func: this.showSubCard,
            name: 'showSubCard',
            actionType: ActionType.ShowCard
        });
        this.styleConfig = DecStyleManager.getInstance().getStyle();
    }
    render() {
        if (!this.props.element.isValid()) {
            return undefined;
        }
        const cardStyle = Object.assign({
            flex: 1,
            backgroundColor: this.styleConfig.card.backgroundColor,
            borderWidth: this.styleConfig.card.borderWidth,
            borderColor: this.styleConfig.card.borderColor,
            borderRadius: this.styleConfig.card.borderRadius,
        }, this.props.style);
        if (this.props.element.backgroundImage) {
            return (React.createElement(ImageBackground, { containerStyle: cardStyle, imageStyle: {
                    borderRadius: this.styleConfig.card.borderRadius,
                }, source: { uri: this.props.element.backgroundImage } },
                React.createElement(View, { style: { flex: 1, padding: this.styleConfig.card.padding } },
                    this.renderBody(),
                    this.renderActions(),
                    this.renderSubCard())));
        }
        else {
            return (React.createElement(View, { style: [cardStyle, {
                        padding: this.styleConfig.card.padding,
                    }] },
                this.renderBody(),
                this.renderActions(),
                this.renderSubCard()));
        }
    }
    renderBody() {
        if (!this.props.element.hasBody()) {
            return null;
        }
        return (React.createElement(View, { style: { flex: 1 } }, this.props.element.body.map((cardElement, index) => React.createElement(ContentElementView, { key: 'body' + index, index: index, element: cardElement }))));
    }
    renderActions() {
        if (!this.props.element.hasActions()) {
            return null;
        }
        return (React.createElement(View, { style: {
                flex: 1,
                flexDirection: DecStyleManager.getInstance().getActionSetFlexDirectionValue(),
                alignItems: 'stretch',
                marginTop: this.styleConfig.action.actionSet.spacing,
            } }, this.props.element.actions.map((action, index) => React.createElement(ActionElementView, { key: index, element: action, index: index, actionContext: this.actionContext }))));
    }
    renderSubCard() {
        if (this.state.subCard) {
            return (React.createElement(CardView, { element: this.state.subCard, style: {
                    marginTop: this.styleConfig.card.spacing,
                } }));
        }
        return undefined;
    }
}
