import React from 'react';
import { View, } from 'react-native';
import { ImageBackground } from '../../Components/Basic/ImageBackground';
import { Column } from '../../Components/Containers/Column';
import { Row } from '../../Components/Containers/Row';
import { ActionContext } from '../../Contexts/ActionContext';
import { ActionType } from '../../Schema/Base/ActionElement';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentFactory } from '../Factories/ContentFactory';
export class AdaptiveCardView extends React.Component {
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
    }
    render() {
        if (!this.props.element.isValid()) {
            return undefined;
        }
        const cardStyle = Object.assign({
            flex: 1,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#777777',
            borderRadius: 4,
        }, this.props.style);
        if (this.props.element.backgroundImage) {
            return (React.createElement(ImageBackground, { containerStyle: cardStyle, imageStyle: {
                    borderRadius: 4,
                }, source: { uri: this.props.element.backgroundImage } },
                React.createElement(View, { style: { flex: 1, padding: 10 } },
                    this.renderBody(),
                    this.renderActions(),
                    this.renderSubCard())));
        }
        else {
            return (React.createElement(View, { style: [
                    cardStyle,
                    {
                        padding: 20,
                    }
                ] },
                this.renderBody(),
                this.renderActions(),
                this.renderSubCard()));
        }
    }
    renderBody() {
        if (!this.props.element.hasBody()) {
            return null;
        }
        return (React.createElement(Column, { vIndex: 0, hIndex: 0, width: 'stretch' }, this.props.element.body.map((contentElement, index) => ContentFactory.createView(contentElement, index))));
    }
    renderActions() {
        if (!this.props.element.hasActions()) {
            return null;
        }
        return (this.props.element.actions.map((action, index) => (React.createElement(Row, { key: 'ActionRow' + index, vIndex: index + 1, hIndex: 0, spacing: 10 }, ActionFactory.createAction(action, 0, this.actionContext)))));
    }
    renderSubCard() {
        if (this.state.subCard) {
            return (React.createElement(AdaptiveCardView, { vIndex: 2, hIndex: 0, element: this.state.subCard, style: {
                    marginTop: 10,
                } }));
        }
        return undefined;
    }
}
