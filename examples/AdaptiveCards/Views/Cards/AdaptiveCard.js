import React from 'react';
import { Platform, StyleSheet, View, } from 'react-native';
import { ImageBackground } from '../../Abandon/Components/Basic/ImageBackground';
import { Column } from '../../Abandon/Components/Containers/Column';
import { Row } from '../../Abandon/Components/Containers/Row';
import { ActionContext } from '../../Contexts/ActionContext';
import { ActionType } from '../../Schema/Abstract/ActionElement';
import { StyleManager } from '../../Styles/StyleManager';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentFactory } from '../Factories/ContentFactory';
export class AdaptiveCardView extends React.Component {
    constructor(props) {
        super(props);
        this.showSubCard = (args) => {
            console.log('Show Card');
            if (args && args.action && args.action.type === ActionType.ShowCard) {
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
        this.actionContext.registerHook({ func: this.showSubCard, name: 'showSubCard', actionType: ActionType.ShowCard });
        this.showCardStyle = StyleManager.getInstance().getShowCardStyle();
    }
    render() {
        if (!this.props.element.isValid) {
            return null;
        }
        const cardStyle = Object.assign(Object.assign({ flex: 1, backgroundColor: '#fff', borderRadius: 4 }, Platform.select({
            ios: {
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: 'rgba(0, 0, 0, .1)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 3,
                shadowOpacity: .08,
            },
            android: {
                elevation: 2,
            }
        })), this.props.style);
        const backgroundImage = this.props.element.getBackgroundImageUrl();
        if (backgroundImage) {
            return (React.createElement(ImageBackground, { containerStyle: cardStyle, imageStyle: {
                    borderRadius: 4,
                }, source: { uri: backgroundImage }, vIndex: 0, hIndex: 0 },
                React.createElement(View, { style: { flex: 1, padding: 0 } },
                    this.renderBody(),
                    this.renderActions(),
                    this.renderSubCard())));
        }
        else {
            return (React.createElement(View, { style: [
                    cardStyle,
                    {
                        padding: 12,
                    }
                ] },
                this.renderBody(),
                this.renderActions(),
                this.renderSubCard()));
        }
    }
    renderBody() {
        if (!this.props.element.body) {
            return null;
        }
        return (React.createElement(Column, { vIndex: 0, hIndex: 0, width: 'stretch', height: 'stretch' }, this.props.element.body.map((contentElement, index) => ContentFactory.createView(contentElement, index, this.props.theme))));
    }
    renderActions() {
        if (!this.props.element.actions) {
            return null;
        }
        const hostActionStyle = StyleManager.getInstance().getActionContainerStyle();
        if (hostActionStyle.direction === 'column') {
            return (this.props.element.actions.map((action, index) => (React.createElement(Row, { key: 'ActionRow' + index, vIndex: 1, hIndex: 0, spacing: 10, width: 'stretch', height: 'auto' }, ActionFactory.createAction(action, 0, 0, this.actionContext)))));
        }
        else {
            return (React.createElement(Row, { vIndex: 1, hIndex: 0, spacing: 10, width: 'stretch', height: 'auto' }, this.props.element.actions.map((action, index) => ActionFactory.createAction(action, 0, index, this.actionContext))));
        }
    }
    renderSubCard() {
        if (this.state.subCard) {
            const style = this.props.style ? this.props.style : {};
            return (React.createElement(AdaptiveCardView, { vIndex: 2, hIndex: 0, element: this.state.subCard, style: Object.assign({ marginTop: this.showCardStyle.margin }, style), theme: this.showCardStyle.theme }));
        }
        return undefined;
    }
}
