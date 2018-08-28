import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { StyleManager } from '../../Styles/StyleManager';
export class ActionView extends React.Component {
    constructor() {
        super(...arguments);
        this.onPress = () => {
            const { model } = this.props;
            if (model && model.onAction) {
                model.onAction(() => {
                    console.log('Action Success');
                }, (error) => {
                    console.log('Action Failed >> ', error);
                });
            }
        };
    }
    render() {
        const { theme } = this.props;
        return (React.createElement(Button, { flex: 1, title: this.title, color: StyleManager.getColor('accent', theme, false), fontSize: StyleManager.getFontSize('default'), fontWeight: StyleManager.getFontWeight('bolder'), backgroundColor: StyleManager.getBackgroundColor(theme), textHorizontalAlign: 'center', textVerticalAlign: 'center', paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, onPress: this.onPress, marginTop: StyleManager.actionDirection === 'vertically' ? this.spacing : 0, marginLeft: StyleManager.actionDirection === 'horizontal' ? this.spacing : 0, style: {
                borderLeftWidth: this.leftBorderWidth,
                borderLeftColor: StyleManager.separatorColor,
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
            return StyleManager.actionSpacing;
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
