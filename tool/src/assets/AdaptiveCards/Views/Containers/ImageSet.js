import * as React from 'react';
import { FlatList } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class ImageSetView extends React.Component {
    constructor() {
        super(...arguments);
        this.keyExtractor = (item, index) => {
            return `url: ${item.url}, index: ${index}`;
        };
        this.renderImage = (info) => {
            const { model, theme } = this.props;
            if (!model) {
                return undefined;
            }
            return (React.createElement(ImageView, { key: info.index, index: 0, model: info.item, size: this.size, maxHeight: StyleManager.inSetImageMaxHeight, spacing: this.getImageSpacing(info.index), theme: theme }));
        };
    }
    render() {
        const { model, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }
        return (React.createElement(FlatList, { data: model.images, renderItem: this.renderImage, keyExtractor: this.keyExtractor, horizontal: true, style: {
                marginTop: this.spacing
            } }));
    }
    get size() {
        const { model } = this.props;
        if (!model) {
            return 'auto';
        }
        if (model.imageSize) {
            return model.imageSize;
        }
        return StyleManager.inSetImageSize;
    }
    getImageSpacing(index) {
        if (index > 0) {
            return StyleManager.getSpacing('default');
        }
        else {
            return 0;
        }
    }
    get spacing() {
        if (this.props.model.separator) {
            return 0;
        }
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
