import * as React from 'react';
import { View } from 'react-native';
import { Touchable } from '../../Components/Basic/Touchable';
import { ActionType } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
import { ColumnView } from './Column';
export class ColumnSetView extends React.Component {
    constructor() {
        super(...arguments);
        this.renderTouchableBlock = () => {
            return (React.createElement(Touchable, { onPress: this.onPress, oneTime: this.hasOneTimeAction, style: {
                    flex: this.flex,
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    justifyContent: 'flex-start',
                    marginTop: this.spacing,
                } }, this.renderContent()));
        };
        this.renderNonTouchableBlock = () => {
            return (React.createElement(View, { style: {
                    flex: this.flex,
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    justifyContent: 'flex-start',
                    marginTop: this.spacing
                } }, this.renderContent()));
        };
        this.renderContent = () => {
            const { model } = this.props;
            if (!model) {
                return undefined;
            }
            return this.renderColumns();
        };
        this.renderColumns = () => {
            const { model } = this.props;
            if (!model || !model.columns || model.columns.length === 0) {
                return undefined;
            }
            return model.columns.map((column, index) => (React.createElement(ColumnView, { key: index, index: index, model: column, theme: this.props.theme })));
        };
        this.onPress = () => {
            const { model } = this.props;
            if (model && model.selectAction && model.selectAction.onAction) {
                model.selectAction.onAction(() => {
                    console.log('Action Success');
                }, (error) => {
                    console.log('Action Failed >> ', error);
                });
            }
        };
    }
    render() {
        const { model, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }
        if (model.selectAction) {
            return this.renderTouchableBlock();
        }
        else {
            return this.renderNonTouchableBlock();
        }
    }
    get hasOneTimeAction() {
        return this.props.model.selectAction && this.props.model.selectAction.type === ActionType.Submit;
    }
    get flex() {
        const { model } = this.props;
        if (!model) {
            return 0;
        }
        if (model.height === 'stretch') {
            return 1;
        }
        return 0;
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
