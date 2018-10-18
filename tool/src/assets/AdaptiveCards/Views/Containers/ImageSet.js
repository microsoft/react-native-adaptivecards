import * as React from 'react';
import { FlatList } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
export class ImageSetView extends React.Component {
    constructor() {
        super(...arguments);
        this.keyExtractor = (item, index) => {
            return `url: ${item.url}, index: ${index}`;
        };
        this.renderImage = (info) => {
            const { model, context, theme } = this.props;
            if (!model) {
                return undefined;
            }
            return (React.createElement(ImageView, { key: info.index, index: 0, model: info.item, context: context, size: this.size, maxHeight: StyleManager.getInSetImageMaxHeight(context.config), spacing: this.getImageSpacing(info.index), theme: theme }));
        };
    }
    render() {
        const { model } = this.props;
        return (React.createElement(FlatList, { data: model.images, renderItem: this.renderImage, keyExtractor: this.keyExtractor, horizontal: true, style: {
                marginTop: this.spacing
            } }));
    }
    getImageSpacing(index) {
        if (index > 0) {
            return StyleManager.getSpacing('default', this.props.context.config);
        }
        else {
            return 0;
        }
    }
    get size() {
        const { model, context } = this.props;
        if (!model) {
            return 'auto';
        }
        if (model.imageSize) {
            return model.imageSize;
        }
        return StyleManager.getInSetImageSize(context.config);
    }
    get spacing() {
        if (this.props.model.separator) {
            return 0;
        }
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing, this.props.context.config);
        }
        return 0;
    }
}
