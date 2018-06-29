import * as React from 'react';
import { ScrollView } from 'react-native';
import { Row } from '../../Components/Containers/Row';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
export class ImageSetView extends React.Component {
    constructor(props) {
        super(props);
        this.renderImages = () => {
            const { element } = this.props;
            if (!element || !element.isValid()) {
                return undefined;
            }
            return element.images.map((img, index) => (React.createElement(ImageView, { key: index, vIndex: 1, hIndex: index, element: img, size: element.imageSize, maxWidth: this.state.maxWidth, maxHeight: this.state.maxHeight, onImageSize: this.onImageSize, hSpace: 10 })));
        };
        this.onImageSize = (width, height, url) => {
            console.log(`ImageSet adjust height: ${height}`);
            let maxWidth = width;
            let maxHeight = height;
            let ratio = width > 0 ? height / width : height;
            if (maxWidth > this.props.containerWidth) {
                maxWidth = this.props.containerWidth;
            }
            maxHeight = maxWidth * ratio;
            if (this.state.maxHeight !== undefined && this.state.maxHeight !== 0 && maxHeight > this.state.maxHeight) {
                maxHeight = this.state.maxHeight;
            }
            this.setState({
                maxHeight: maxHeight
            });
        };
        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }
        this.state = {
            maxWidth: undefined,
            maxHeight: undefined,
        };
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(ScrollView, { flex: 1, horizontal: true, minHeight: this.state.maxHeight },
            React.createElement(Row, { vIndex: 0, hIndex: 0, spacing: this.styleConfig.spacing, wrap: 'nowrap' }, this.renderImages())));
    }
}
