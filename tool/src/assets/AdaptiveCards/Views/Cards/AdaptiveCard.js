import * as React from 'react';
import { View } from 'react-native';
import { ButtonGroup } from '../../Components/Containers/ButtonGroup';
import { Card } from '../../Components/Containers/Card';
import { StyleManager } from '../../Styles/StyleManager';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentFactory } from '../Factories/ContentFactory';
export class AdaptiveCardView extends React.Component {
    constructor(props) {
        super(props);
        this.showSubCard = (card) => {
            console.log('Show Card');
            if (card) {
                this.setState({
                    subCard: card
                });
            }
            return Promise.resolve(true);
        };
        this.onLayout = (event) => {
            this.setState({
                width: event.nativeEvent.layout.width,
            });
        };
        this.state = {
            subCard: undefined,
            width: 0,
        };
        this.props.model.context.registerShowCardActionHandler(this.showSubCard);
    }
    render() {
        const { model } = this.props;
        return (React.createElement(Card, { flex: 1, fit: 'container', backgroundImageUrl: model.backgroundImage, onLayout: this.onLayout, style: [
                {
                    minHeight: this.minHeight,
                },
                this.props.style
            ] },
            this.renderBody(),
            this.renderSubCard(),
            this.renderActionSet()));
    }
    renderBody() {
        const { model } = this.props;
        if (!model || !model.body) {
            return undefined;
        }
        return (React.createElement(View, { style: {
                flexDirection: 'column',
                alignSelf: 'stretch',
                flex: 1
            } }, this.props.model.body.map((content, index) => ContentFactory.createView(content, index, this.props.theme))));
    }
    renderActionSet() {
        const { model } = this.props;
        if (!model || !model.actions || model.actions.length === 0) {
            return undefined;
        }
        return (React.createElement(ButtonGroup, null, this.renderActions()));
    }
    renderActions() {
        const { model, theme } = this.props;
        if (!model || !model.actions) {
            return undefined;
        }
        let capacity = StyleManager.maxActions;
        return model.actions.map((action, index) => {
            if (index < capacity) {
                return ActionFactory.createAction(action, index, theme);
            }
            else {
                return undefined;
            }
        });
    }
    renderSubCard() {
        if (this.state.subCard) {
            return (React.createElement(AdaptiveCardView, { index: 2, model: this.state.subCard, style: {
                    marginTop: StyleManager.subCardSpacing
                }, theme: StyleManager.subCardTheme }));
        }
        return undefined;
    }
    get minHeight() {
        const { model } = this.props;
        if (model) {
            if (model.context && model.context.fit === 'background') {
                let padding = 12;
                if (model.backgroundImage) {
                    padding = 0;
                }
                return (this.state.width - padding * 2) * 150 / 285 + padding * 2;
            }
        }
        return undefined;
    }
}
