import React from 'react';
import { View, } from 'react-native';
import { InputContext } from '../../Context/InputContext';
import { ActionType } from '../../Schema/Base/ActionElement';
import { AdaptiveCardElement } from '../../Schema/Cards/AdaptiveCard';
import { ActionView } from '../Actions/ActionView';
import { CardElementView } from '../Base/CardElementView';
import { ImageBackground } from '../Base/ImageBackground';
import { styleManager } from '../Styles/StyleManager';
export class AdaptiveCardView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.submitActionHook = this.submitActionHook.bind(this);
        this.styleConfig = styleManager.getStyle();
        this.element = new AdaptiveCardElement(props.element);
        console.log('AdaptiveCard', this.element);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.element) {
            this.element = new AdaptiveCardElement(nextProps.element);
        }
    }
    render() {
        if (!this.element.isValid()) {
            return null;
        }
        const cardStyle = Object.assign({
            flex: 1,
            backgroundColor: this.styleConfig.card.backgroundColor,
            borderWidth: this.styleConfig.card.borderWidth,
            borderColor: this.styleConfig.card.borderColor,
            borderRadius: this.styleConfig.card.borderRadius,
        }, this.props.style);
        if (this.element.backgroundImage) {
            return (React.createElement(ImageBackground, { containerStyle: cardStyle, imageStyle: {
                    borderRadius: this.styleConfig.card.borderRadius,
                }, source: { uri: this.element.backgroundImage } },
                React.createElement(View, { style: { flex: 1, padding: this.styleConfig.card.padding } },
                    this.renderBody(),
                    this.renderActions())));
        }
        else {
            return (React.createElement(View, { style: [cardStyle, {
                        padding: this.styleConfig.card.padding,
                    }] },
                this.renderBody(),
                this.renderActions()));
        }
    }
    renderBody() {
        if (!this.element.hasBody()) {
            return null;
        }
        return (React.createElement(View, { style: { flex: 1 } }, this.element.body.map((cardElement, index) => React.createElement(CardElementView, { key: 'body' + index, index: index, element: cardElement }))));
    }
    renderActions() {
        if (!this.element.hasActions()) {
            return null;
        }
        return (React.createElement(View, { style: {
                flex: 1,
                flexDirection: styleManager.getActionSetFlexDirectionValue(),
                alignItems: 'stretch',
                marginTop: this.styleConfig.action.actionSet.spacing,
            } }, this.element.actions.map((action, index) => React.createElement(ActionView, { key: index, element: action, index: index, actionHook: this.submitActionHook }))));
    }
    submitActionHook(args) {
        if (args.action.type === ActionType.Submit) {
            args.formData = Object.assign({}, args.action.getData(), InputContext.getInstance().getFields(this.element.getAllInputFieldIds()));
        }
        return args;
    }
}
