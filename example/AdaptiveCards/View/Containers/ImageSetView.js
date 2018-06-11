import React from 'react';
import { FlatList, View, } from 'react-native';
import { CardElementView } from '../Elements/CardElementView';
import { CardElementWrapper } from '../Shared/CardElementWrapper';
import { styleManager } from '../Styles/StyleManager';
export class ImageSetView extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.renderImage = (image, index) => {
            const { imageSet } = this.props;
            image.setSize(imageSet.imageSize);
            return React.createElement(CardElementView, { key: 'image' + index, index: index, cardElement: image });
        };
    }
    render() {
        const { imageSet, index } = this.props;
        if (!imageSet || !imageSet.isValid() || !imageSet.hasImages()) {
            return null;
        }
        return React.createElement(CardElementWrapper, { cardElement: imageSet, index: index, style: {
                flex: 1,
            } }, styleManager.isHorizontalImageSet() ?
            React.createElement(FlatList, { style: { flex: 1 }, horizontal: true, data: imageSet.images, renderItem: ({ item, index }) => this.renderImage(item, index), keyExtractor: (item, index) => 'image' + index, showsHorizontalScrollIndicator: false })
            :
                React.createElement(View, { style: {
                        flex: 1,
                        flexWrap: 'wrap',
                    } }, imageSet.images.map(this.renderImage)));
    }
}
