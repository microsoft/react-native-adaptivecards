import React from 'react';
import { FlatList, View, } from 'react-native';
import { ContentFactory } from '../Factories/ContentFactory';
import { DecStyleManager } from '../Styles/DecStyleManager';
export class ImageSetView extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.renderListItem = (renderInfo) => {
            return this.renderImage(renderInfo.item, renderInfo.index);
        };
        this.renderImage = (image, index) => {
            const { element } = this.props;
            image.setSize(element.imageSize);
            return ContentFactory.createView(image, index, true);
        };
        this.extractKey = (image) => {
            return 'img-set-img' + image.url;
        };
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid() || !element.hasImages()) {
            return null;
        }
        return (DecStyleManager.getInstance().isHorizontalImageSet() ?
            React.createElement(FlatList, { style: { flex: 1 }, horizontal: true, data: element.images, renderItem: this.renderListItem, keyExtractor: this.extractKey, showsHorizontalScrollIndicator: false })
            :
                React.createElement(View, { style: {
                        flex: 1,
                        flexWrap: 'wrap',
                    } }, element.images.map(this.renderImage)));
    }
}
