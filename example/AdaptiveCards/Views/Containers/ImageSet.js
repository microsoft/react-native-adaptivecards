import * as React from 'react';
import { FlatList } from 'react-native';
import { ImageUtils } from '../../Shared/Utils';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
export class ImageSetView extends React.Component {
    constructor(props) {
        super(props);
        this.keyExtractor = (item, index) => {
            return `url: ${item.url}, index: ${index}`;
        };
        this.renderImage = (info) => {
            const { element } = this.props;
            if (!element || !element.isValid()) {
                return undefined;
            }
            return (React.createElement(ImageView, { key: info.index, vIndex: 1, hIndex: info.index, element: info.item, size: element.imageSize, maxWidth: this.state.maxWidth, maxHeight: this.state.maxHeight, fitAxis: 'v', onImageSize: this.onImageSize, hSpace: 10 }));
        };
        this.onImageSize = (width, height) => {
            this.setState({
                maxHeight: height
            });
        };
        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }
        this.state = {
            maxWidth: undefined,
            maxHeight: undefined,
            containerWidth: undefined,
            containerHeight: undefined,
        };
    }
    componentDidUpdate() {
        const { element, containerWidth, containerHeight } = this.props;
        if (containerWidth && containerHeight &&
            (containerWidth !== this.state.containerWidth || containerHeight !== this.state.containerHeight)) {
            this.setState({
                containerWidth: containerWidth,
                containerHeight: containerHeight,
            });
            ImageUtils.fetchSetSize(element.images.map(img => img.url), { width: containerWidth, height: containerHeight }, this.styleConfig.imgSize, this.onImageSize, (error) => {
                console.log(error);
            });
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(FlatList, { data: element.images, renderItem: this.renderImage, keyExtractor: this.keyExtractor, horizontal: true, minHeight: this.state.maxHeight + this.styleConfig.spacing }));
    }
}
