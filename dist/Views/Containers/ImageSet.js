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
            const { element } = this.props;
            if (!element || !element.isValid) {
                return undefined;
            }
            return (React.createElement(ImageView, { key: info.index, index: 0, element: info.item, size: this.size, maxHeight: StyleManager.inSetImageMaxHeight, spacing: this.getImageSpacing(info.index) }));
        };
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(FlatList, { data: element.images, renderItem: this.renderImage, keyExtractor: this.keyExtractor, horizontal: true, marginTop: this.spacing }));
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
