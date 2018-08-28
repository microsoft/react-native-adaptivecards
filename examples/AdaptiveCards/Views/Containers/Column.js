import * as React from 'react';
import { View } from 'react-native';
import { Touchable } from '../../Components/Basic/Touchable';
import { StyleManager } from '../../Styles/StyleManager';
import { ContentFactory } from '../Factories/ContentFactory';
export class ColumnView extends React.Component {
    constructor() {
        super(...arguments);
        this.renderTouchableBlock = (backgroundColor) => {
            return (React.createElement(Touchable, { onPress: this.onPress, style: {
                    flex: this.flex,
                    flexDirection: 'column',
                    alignSelf: this.alignSelf,
                    justifyContent: this.justifyContent,
                    marginLeft: this.spacing,
                    backgroundColor: backgroundColor,
                } }, this.renderContent()));
        };
        this.renderNonTouchableBlock = (backgroundColor) => {
            return (React.createElement(View, { style: {
                    flex: this.flex,
                    flexDirection: 'column',
                    alignSelf: this.alignSelf,
                    justifyContent: this.justifyContent,
                    marginLeft: this.spacing,
                    backgroundColor: backgroundColor
                } }, this.renderContent()));
        };
        this.renderContent = () => {
            const { model } = this.props;
            if (!model) {
                return undefined;
            }
            const background = model.backgroundImage;
            if (background) {
                return ContentFactory.createBackgroundImageView(this.renderItems(), background);
            }
            return this.renderItems();
        };
        this.renderItems = () => {
            const { model } = this.props;
            if (!model) {
                return undefined;
            }
            if (model.items) {
                return model.items.map((content, index) => ContentFactory.createView(content, index, model.style || this.props.theme));
            }
            return undefined;
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
        let backgroundColor = StyleManager.getBackgroundColor(model.style);
        if (model.selectAction) {
            return this.renderTouchableBlock(backgroundColor);
        }
        else {
            return this.renderNonTouchableBlock(backgroundColor);
        }
    }
    get justifyContent() {
        const { model } = this.props;
        if (!model) {
            return 'flex-start';
        }
        switch (model.verticalContentAlignment) {
            case 'top':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'bottom':
                return 'flex-end';
            default:
                return 'center';
        }
    }
    get alignSelf() {
        const { model } = this.props;
        if (!model) {
            return 'flex-start';
        }
        if (model.height === 'stretch') {
            return 'stretch';
        }
        return 'flex-start';
    }
    get flex() {
        const { model } = this.props;
        if (!model || model.width === 'auto') {
            return 0;
        }
        if (model.width === undefined || model.width === 'stretch') {
            return 1;
        }
        return model.width;
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
