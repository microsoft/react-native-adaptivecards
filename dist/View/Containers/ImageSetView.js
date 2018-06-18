import React from 'react';
import { FlatList, View, } from 'react-native';
import { DecCardElementView } from '../Basic/DecCardElementView';
import { DecCardElementWrapper } from '../Basic/DecCardElementWrapper';
import { StyleManager } from '../Styles/StyleManager';
export class ImageSetView extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.renderImage = (image, index) => {
            const { element } = this.props;
            image.setSize(element.imageSize);
            return (React.createElement(DecCardElementView, { key: 'image' + index, index: index, element: image }));
        };
    }
    render() {
        const { element, index } = this.props;
        if (!element || !element.isValid() || !element.hasImages()) {
            return null;
        }
        return (React.createElement(DecCardElementWrapper, { element: element, index: index, style: {
                flex: 1,
            } }, StyleManager.getInstance().isHorizontalImageSet() ?
            React.createElement(FlatList, { style: { flex: 1 }, horizontal: true, data: element.images, renderItem: ({ item, index }) => this.renderImage(item, index), keyExtractor: (item, index) => 'image' + index, showsHorizontalScrollIndicator: false })
            :
                React.createElement(View, { style: {
                        flex: 1,
                        flexWrap: 'wrap',
                    } }, element.images.map(this.renderImage))));
    }
}
