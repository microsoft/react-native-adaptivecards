import React from 'react';
import { FlatList, View, } from 'react-native';
import { CardElementView } from '../Base/CardElementView';
import { CardElementWrapper } from '../Base/CardElementWrapper';
import { styleManager } from '../Styles/StyleManager';
export class ImageSetView extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.renderImage = (image, index) => {
            const { element } = this.props;
            image.setSize(element.imageSize);
            return (React.createElement(CardElementView, { key: 'image' + index, index: index, element: image }));
        };
    }
    render() {
        const { element, index } = this.props;
        if (!element || !element.isValid() || !element.hasImages()) {
            return null;
        }
        return (React.createElement(CardElementWrapper, { element: element, index: index, style: {
                flex: 1,
            } }, styleManager.isHorizontalImageSet() ?
            React.createElement(FlatList, { style: { flex: 1 }, horizontal: true, data: element.images, renderItem: ({ item, index }) => this.renderImage(item, index), keyExtractor: (item, index) => 'image' + index, showsHorizontalScrollIndicator: false })
            :
                React.createElement(View, { style: {
                        flex: 1,
                        flexWrap: 'wrap',
                    } }, element.images.map(this.renderImage))));
    }
}
