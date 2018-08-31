import * as React from 'react';
import { View } from 'react-native';
import { ButtonGroup } from '../../Components/Containers/ButtonGroup';
import { Card } from '../../Components/Containers/Card';
import { ActionContext } from '../../Contexts/ActionContext';
import { ActionType } from '../../Schema/Abstract/ActionElement';
import { StyleManager } from '../../Styles/StyleManager';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
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
        const { element, theme } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.type + ' is not valid', theme, 'error');
        }
        return (React.createElement(Card, { flex: 1, fit: 'container', backgroundImageUrl: element.getBackgroundImageUrl(), style: [
                {
                    minHeight: 150,
                }, this.props.style
            ] },
            this.renderBody(),
            this.renderSubCard(),
            this.renderActionSet()));
    }
    renderBody() {
        const { element } = this.props;
        if (!element || !element.isValid || !element.body) {
            return undefined;
        }
        return (React.createElement(View, { style: {
                flexDirection: 'column',
                alignSelf: 'stretch',
                flex: 1
            } }, this.props.element.body.map((contentElement, index) => ContentFactory.createView(contentElement, index, this.props.theme))));
    }
    renderActionSet() {
        const { element } = this.props;
        if (!element || !element.isValid || !element.actions || element.actions.length === 0) {
            return undefined;
        }
        return (React.createElement(ButtonGroup, null, this.renderActions()));
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
