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
            const { element, theme } = this.props;
            if (!element || !element.isValid) {
                return undefined;
            }
            return (React.createElement(ImageView, { key: info.index, index: 0, element: info.item, size: this.size, maxHeight: StyleManager.inSetImageMaxHeight, spacing: this.getImageSpacing(info.index), theme: theme }));
        };
    }
    render() {
        const { element, theme } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }
        return (React.createElement(FlatList, { data: element.images, renderItem: this.renderImage, keyExtractor: this.keyExtractor, horizontal: true, style: {
                marginTop: this.spacing
            } }));
    }
    get size() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return 'auto';
        }
        if (element.imageSize) {
            return element.imageSize;
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
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
