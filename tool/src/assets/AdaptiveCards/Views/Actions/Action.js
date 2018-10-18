import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { StyleManager } from '../../Styles/StyleManager';
export class ActionView extends React.Component {
    constructor() {
        super(...arguments);
        this.onPress = () => {
            const { model, context } = this.props;
            if (model && context && model.onAction) {
                model.onAction(context);
            }
        };
    }
    render() {
        const { model, theme, context } = this.props;
        return (React.createElement(Button, { flex: 1, title: this.title, color: StyleManager.getColor('accent', theme, false, context.config), fontSize: StyleManager.getFontSize('default', context.config), fontWeight: StyleManager.getFontWeight('bolder', context.config), backgroundColor: StyleManager.getBackgroundColor(theme, context.config), textHorizontalAlign: 'center', textVerticalAlign: 'center', paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, onPress: this.onPress, disabled: !model.enabled, marginTop: StyleManager.getActionDirection(context.config) === 'vertically' ? this.spacing : 0, marginLeft: StyleManager.getActionDirection(context.config) === 'horizontal' ? this.spacing : 0, style: {
                borderLeftWidth: this.leftBorderWidth,
                borderLeftColor: StyleManager.getSeparatorColor(context.config),
            } }));
    }
    get leftBorderWidth() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return 1;
        }
        return 0;
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getActionSpacing(this.props.context.config);
        }
        return 0;
    }
    get title() {
        const { model } = this.props;
        if (!model) {
            return '';
        }
        return model.title ? model.title.toLocaleUpperCase() : '';
    }
}
