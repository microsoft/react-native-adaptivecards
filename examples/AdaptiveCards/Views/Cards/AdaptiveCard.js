import * as React from 'react';
import { View } from 'react-native';
import { ButtonGroup } from '../../Components/Containers/ButtonGroup';
import { Card } from '../../Components/Containers/Card';
import { StyleManager } from '../../Styles/StyleManager';
import { ActionView } from '../Actions/Action';
import { Factory as ViewFactory } from '../Factory';
export class AdaptiveCardView extends React.Component {
    constructor(props) {
        super(props);
        this.onLayout = (event) => {
            this.setState({
                width: event.nativeEvent.layout.width,
            });
        };
        this.state = {
            width: 0,
        };
    }
    render() {
        const { model, context } = this.props;
        if (model.show) {
            return (React.createElement(Card, { flex: 1, fit: 'container', backgroundImageUrl: model.backgroundImage, onLayout: this.onLayout, config: context.config, style: [
                    {
                        marginTop: this.marginTop,
                        minHeight: this.minHeight,
                    },
                    this.props.style
                ] },
                this.renderBody(),
                this.renderActionSet()));
        }
        return null;
    }
    renderBody() {
        const { model, context } = this.props;
        if (!model || !model.body) {
            return undefined;
        }
        return (React.createElement(View, { style: {
                flexDirection: 'column',
                alignSelf: 'stretch',
                flex: 1
            } }, this.props.model.body.map((content, index) => ViewFactory.createView(content, context, index, this.props.theme))));
    }
    renderActionSet() {
        const { model, context } = this.props;
        if (!model || !model.actions || model.actions.length === 0) {
            return undefined;
        }
        return (React.createElement(ButtonGroup, { hasSpacing: model && model.body && model.body.length > 0, config: context.config }, this.renderActions()));
    }
    renderActions() {
        const { model, context, theme } = this.props;
        if (!model || !model.actions) {
            return undefined;
        }
        let capacity = StyleManager.getMaxActions(context.config);
        return model.actions.map((action, index) => {
            if (index < capacity) {
                return (React.createElement(ActionView, { key: action.type + index, index: index, model: action, context: context, theme: theme }));
            }
            else {
                return undefined;
            }
        });
    }
    get minHeight() {
        const { model, context } = this.props;
        if (model) {
            if (context && context.fit === 'background') {
                let padding = 12;
                if (model.backgroundImage) {
                    padding = 0;
                }
                return (this.state.width - padding * 2) * 150 / 285 + padding * 2;
            }
        }
        return undefined;
    }
    get marginTop() {
        const { model, context } = this.props;
        if (model && context) {
            if (model.parent) {
                return StyleManager.getSubCardSpacing(context.config);
            }
        }
        return undefined;
    }
}
