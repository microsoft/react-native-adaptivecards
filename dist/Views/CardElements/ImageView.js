import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { FlexBox } from '../Basic/FlexBox';
export class ImageView extends React.Component {
    constructor(props) {
        super(props);
        this.onLayout = (event) => {
            let width = event.nativeEvent.layout.width;
            let height = event.nativeEvent.layout.height;
            this.setState({
                containerWidth: width,
                containerHeight: height,
            });
        };
        this.onLoad = () => {
            Image.getSize(this.props.element.url, this.onFetchSize, this.onFetchSizeError);
        };
        this.onError = () => {
            console.error(`ImageView failed to load url: ${this.props.element.url}`);
        };
        this.onFetchSize = (width, height) => {
            this.setState({
                loaded: true,
                ratio: height / (width > 0 ? width : 1),
                width: width,
                height: height,
            });
        };
        this.onFetchSizeError = (err) => {
            console.error(err);
        };
        this.getRadius = (width) => {
            if (this.props.element.style === 'person') {
                return {
                    borderRadius: width / 2,
                };
            }
            return {};
        };
        this.getSize = () => {
            if (this.styleConfig.imgSize === 'auto') {
                return this.getAutoSize();
            }
            if (this.styleConfig.imgSize === 'stretch') {
                return this.getStretchSize();
            }
            return this.getSpecifiedSize();
        };
        this.getAutoSize = () => {
            let finalWidth = this.state.width;
            if (finalWidth > this.state.containerWidth) {
                finalWidth = this.state.containerWidth;
            }
            return {
                width: finalWidth,
                height: finalWidth * this.state.ratio
            };
        };
        this.getStretchSize = () => {
            return {
                width: this.state.containerWidth,
                height: this.state.containerWidth * this.state.ratio
            };
        };
        this.getSpecifiedSize = () => {
            if (typeof this.styleConfig.imgSize === 'number') {
                let finalWidth = this.styleConfig.imgSize;
                if (finalWidth > this.state.containerWidth) {
                    finalWidth = this.state.containerWidth;
                }
                return {
                    width: finalWidth,
                    height: finalWidth * this.state.ratio,
                };
            }
        };
        this.state = {
            loaded: false,
            containerWidth: 1,
            containerHeight: 1,
            width: 1,
            height: 1,
            ratio: 1,
        };
        this.styleConfig = StyleManager.getInstance().getStyle(this.props.element);
    }
    render() {
        console.log(`element.align:' ${this.props.element.horizontalAlignment} config.align: ${this.styleConfig.alignSelf}`);
        return (React.createElement(FlexBox, { size: this.styleConfig.imgSize, index: this.props.index, spacing: this.styleConfig.spacing, align: this.styleConfig.alignSelf, onLayout: this.onLayout },
            this.renderPlaceholder(),
            this.renderImg()));
    }
    renderPlaceholder() {
        if (!this.state.loaded) {
            return (React.createElement(View, { style: [
                    StyleSheet.absoluteFill,
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
    }
    renderImg() {
        let size = this.getSize();
        return (React.createElement(Image, { accessible: !!this.props.element.altText, accessibilityLabel: this.props.element.altText || undefined, style: [
                {
                    overflow: 'hidden',
                    borderColor: 'red',
                    borderWidth: 1,
                },
                size,
                this.getRadius(size.width)
            ], source: { uri: this.props.element.url }, onLoad: this.onLoad, onError: this.onError, resizeMode: 'cover', resizeMethod: 'auto' }));
    }
}
