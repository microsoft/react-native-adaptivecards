import * as React from 'react';
import { View } from 'react-native';
import { Touchable } from '../../Components/Basic/Touchable';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
import { ColumnView } from './Column';
export class ColumnSetView extends React.Component {
    constructor() {
        super(...arguments);
        this.renderTouchableBlock = () => {
            return (React.createElement(Touchable, { onPress: this.onPress, style: {
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
            const background = model.backgroundImage;
            if (background) {
                return ContentFactory.createBackgroundImageView(this.renderColumns(), background);
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
        const { model } = this.props;
        if (model.selectAction) {
            return this.renderTouchableBlock();
        }
        else {
            return this.renderNonTouchableBlock();
        }
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
