import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ImageBackground } from '../../Components/Basic/ImageBackground';
import { ActionContext } from '../../Contexts/ActionContext';
import { ActionType } from '../../Schema/Abstract/ActionElement';
import { StyleManager } from '../../Styles/StyleManager';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
const styles = StyleSheet.create({
    cardContainer: Object.assign({ flex: 1, backgroundColor: '#fff', borderRadius: 4 }, Platform.select({
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
    })),
});
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
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.type + ' is not valid', 'error');
        }
        return (React.createElement(View, { style: this.props.style || styles.cardContainer }, this.renderCard()));
    }
    renderCard() {
        const { element, theme } = this.props;
        if (!element || !element.isValid) {
            return undefined;
        }
        const cardStyle = {
            flex: 1,
            backgroundColor: StyleManager.getBackgroundColor(theme),
            borderRadius: 4,
            overflow: 'hidden',
        };
        const backgroundImage = element.getBackgroundImageUrl();
        if (backgroundImage) {
            return (React.createElement(ImageBackground, { url: backgroundImage, containerStyle: cardStyle, imageStyle: { borderRadius: 4 } },
                React.createElement(View, { style: { flex: 1, padding: 0, minHeight: 150 } },
                    this.renderBody(),
                    this.renderSubCard(),
                    this.renderActions())));
        }
        else {
            return (React.createElement(View, { style: [
                    cardStyle,
                    {
                        padding: 12,
                        minHeight: 150
                    }
                ] },
                this.renderBody(),
                this.renderSubCard(),
                this.renderActionSet()));
        }
    }
    renderBody() {
        const { element } = this.props;
        if (!element || !element.isValid || !element.body) {
            return undefined;
        }
        return (React.createElement(View, { flexDirection: 'column', alignSelf: 'stretch', flex: 1 }, this.props.element.body.map((contentElement, index) => ContentFactory.createView(contentElement, index, this.props.theme))));
    }
    renderActionSet() {
        const { element } = this.props;
        if (!element || !element.isValid || !element.actions || element.actions.length === 0) {
            return undefined;
        }
        return (React.createElement(View, { flexDirection: StyleManager.actionDirection === 'vertically' ? 'column' : 'row', alignSelf: 'stretch', marginTop: StyleManager.actionSetSpacing, justifyContent: 'center', borderTopWidth: 0, borderTopColor: StyleManager.separatorColor }, this.renderActions()));
    }
    renderActions() {
        const { element, theme } = this.props;
        if (!element || !element.isValid || !element.actions) {
            return undefined;
        }
        let capacity = StyleManager.maxActions;
        return element.actions.map((action, index) => {
            if (index < capacity) {
                return ActionFactory.createAction(action, index, theme, this.actionContext);
            }
            else {
                return undefined;
            }
        });
    }
    renderSubCard() {
        if (this.state.subCard) {
            return (React.createElement(AdaptiveCardView, { index: 2, element: this.state.subCard, style: {
                    marginTop: StyleManager.subCardSpacing
                }, theme: StyleManager.subCardTheme }));
        }
        return undefined;
    }
}
