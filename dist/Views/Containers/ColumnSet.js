import * as React from 'react';
import { View } from 'react-native';
import { Touchable } from '../../Components/Basic/Touchable';
import { ActionContext } from '../../Contexts/ActionContext';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
import { ColumnView } from './Column';
export class ColumnSetView extends React.Component {
    constructor() {
        super(...arguments);
        this.renderTouchableBlock = () => {
            return (React.createElement(Touchable, { onPress: this.onPress, style: {
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    justifyContent: 'flex-start',
                    marginTop: this.spacing,
                } }, this.renderContent()));
        };
        this.renderNonTouchableBlock = () => {
            return (React.createElement(View, { flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-start', marginTop: this.spacing }, this.renderContent()));
        };
        this.renderContent = () => {
            const { element } = this.props;
            if (!element || !element.isValid) {
                return undefined;
            }
            const background = element.getBackgroundImageUrl();
            if (background) {
                return ContentFactory.createBackgroundImageView(this.renderColumns(), background);
            }
            return this.renderColumns();
        };
        this.renderColumns = () => {
            const { element } = this.props;
            if (!element || !element.isValid || !element.columns || element.columns.length === 0) {
                return undefined;
            }
            return element.columns.map((column, index) => (React.createElement(ColumnView, { key: index, index: index, element: column, theme: this.props.theme })));
        };
        this.onPress = () => {
            let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element.selectAction);
            if (callback) {
                callback();
            }
        };
    }
    render() {
        const { element, theme } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }
        if (element.selectAction) {
            return this.renderTouchableBlock();
        }
        else {
            return this.renderNonTouchableBlock();
        }
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
