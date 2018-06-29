import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { MediaContext } from '../../Contexts/MediaContext';
import { FlexBox } from './FlexBox';
export class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.renderPlaceholder = () => {
            if (!this.state.loaded) {
                return (React.createElement(View, { style: [
                        {
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    ] },
                    React.createElement(Text, { style: {
                            fontSize: 32,
                            color: 'rgba(0, 0, 0, 0.5)',
                            textAlign: 'center'
                        } }, '\uE601')));
            }
            return undefined;
        };
        this.fetchImageSize = () => {
            let dimension = MediaContext.getInstance().fetchDimension(this.props.url);
            if (dimension) {
                this.onImageSize(dimension.width, dimension.height);
            }
            else {
                Image.getSize(this.props.url, this.onImageSize, this.onImageSizeError);
            }
        };
        this.onLayoutChange = (width, height) => {
            this.fetchImageSize();
        };
        this.onImageSizeUpdate = (event) => {
            let width = event.nativeEvent.layout.width;
            let height = event.nativeEvent.layout.height;
            console.log(`Image at url:${this.props.url} size updated. Width: ${width}, height: ${height}`);
            if (this.props.onImageSize) {
                this.props.onImageSize(width, height);
            }
        };
        this.onImageSize = (width, height) => {
            console.log(`Image at url:${this.props.url} get size succeed. Width: ${width}, height: ${height}`);
            MediaContext.getInstance().cacheDimension(this.props.url, { width: width, height: height });
            let ratio = width > 0 ? height / width : height;
            if (this.props.width === 'auto') {
                this.applyAutoSize(width, ratio);
            }
            else if (this.props.width === 'stretch') {
                this.applyStretchSize(width, height, ratio);
            }
            else {
                this.applyFixSize(ratio);
            }
        };
        this.onImageSizeError = () => {
            console.log(`Image at url:${this.props.url} get size failed.`);
            this.setState({
                loaded: false
            });
        };
        this.onImageLoad = () => {
            console.log(`Image at url:${this.props.url} load succeed.`);
            this.setState({
                loaded: true
            });
            this.fetchImageSize();
        };
        this.onImageError = () => {
            console.log(`Image at url:${this.props.url} load failed.`);
            this.setState({
                loaded: false
            });
        };
        this.state = {
            loaded: true,
            width: undefined,
            height: undefined,
            ratio: 1,
        };
    }
    render() {
        return (React.createElement(FlexBox, Object.assign({}, this.props, { style: [
                this.props.boxStyle,
                {
                    alignSelf: this.props.alignSelf,
                }
            ], onLayoutChange: this.onLayoutChange, onPress: this.props.onPress, width: 'auto' }),
            this.renderPlaceholder(),
            React.createElement(Image, { accessible: !!this.props.alt, accessibilityLabel: this.props.alt, source: { uri: this.props.url }, style: [
                    this.getSize(),
                    this.props.imgStyle
                ], onLoad: this.onImageLoad, onError: this.onImageError, onLayout: this.onImageSizeUpdate })));
    }
    applyFixSize(ratio) {
        if (typeof this.props.width === 'number') {
            this.setState({
                width: this.props.width,
                height: this.props.width * ratio,
                ratio: ratio,
            });
        }
    }
    applyStretchSize(width, height, ratio) {
        if (this.props.containerWidth) {
            let finalWidth = this.props.containerWidth;
            let finalHeight = finalWidth * ratio;
            console.log(`Image at url:${this.props.url} get size succeed. Final width: ${finalWidth}, final height: ${finalHeight}`);
            this.setState({
                width: finalWidth,
                height: finalHeight,
                ratio: ratio
            });
        }
        else {
            this.setState({
                width: width,
                height: height,
                ratio: ratio
            });
        }
    }
    applyAutoSize(width, ratio) {
        let finalWidth = width;
        if (finalWidth > this.props.containerWidth) {
            finalWidth = this.props.containerWidth;
        }
        let finalHeight = finalWidth * ratio;
        console.log(`Image at url:${this.props.url} get size succeed. Final width: ${finalWidth}, final height: ${finalHeight}`);
        this.setState({
            width: finalWidth,
            height: finalHeight,
            ratio: ratio
        });
    }
    getSize() {
        let finalWidth = this.state.width;
        let finalHeight = this.state.height;
        if (this.state.width && this.state.height) {
            if (this.state.ratio <= 1) {
                if (this.props.maxWidth && finalWidth > this.props.maxWidth) {
                    finalWidth = this.props.maxWidth;
                }
                finalHeight = finalWidth * this.state.ratio;
                if (this.props.maxHeight && finalHeight > this.props.maxHeight) {
                    finalHeight = this.props.maxHeight;
                    finalWidth = this.state.ratio > 0 ? finalHeight / this.state.ratio : finalWidth;
                }
            }
            else {
                if (this.props.maxHeight && finalHeight > this.props.maxHeight) {
                    finalHeight = this.props.maxHeight;
                }
                finalWidth = this.state.ratio > 0 ? finalHeight / this.state.ratio : finalWidth;
                if (this.props.maxWidth && finalWidth > this.props.maxWidth) {
                    finalWidth = this.props.maxWidth;
                }
            }
        }
        return {
            width: finalWidth,
            height: finalHeight,
        };
    }
}
