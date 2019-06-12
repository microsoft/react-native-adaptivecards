import * as React from 'react';
import { Button } from '../../Components/Inputs/Button';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class ActionView extends React.Component {
    constructor(props) {
        super(props);
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
        this.state = {
            disabled: false,
        };
    }
    render() {
        const { model, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.title + ' is not valid', theme, 'error');
        }
        return (React.createElement(Button, { flex: 1, title: this.title, color: StyleManager.getColor('accent', theme, false), fontSize: StyleManager.getFontSize('default'), fontWeight: StyleManager.getFontWeight('bolder'), backgroundColor: StyleManager.getBackgroundColor(theme), textHorizontalAlign: 'center', textVerticalAlign: 'center', paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16, onPress: this.onPress, disabled: this.state.disabled, style: this.borderStyle }));
    }
    get borderWidth() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.separatorThickness;
        }
        return 0;
    }
    get borderStyle() {
        switch (this.props.direction) {
            case 'column':
                return {
                    paddingTop: 16,
                    paddingBottom: 16,
                    borderTopWidth: this.borderWidth,
                    borderTopColor: StyleManager.separatorColor,
                };
            default:
                return {
                    paddingTop: 6,
                    paddingBottom: 6,
                    borderLeftWidth: this.borderWidth,
                    borderLeftColor: StyleManager.separatorColor,
                };
        }
    }
    get title() {
        const { model } = this.props;
        if (!model) {
            return '';
        }
        return model.title ? model.title.toLocaleUpperCase() : '';
    }
}
