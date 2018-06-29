import * as React from 'react';
import {
    Image,
    LayoutChangeEvent,
    Text,
    View
} from 'react-native';
import { MediaContext } from '../../Contexts/MediaContext';
import { IFlexProps } from '../BaseProps';
import { FlexBox } from './FlexBox';

interface IProps extends IFlexProps {
    url: string;
    alt?: string;
    maxWidth?: number;
    maxHeight?: number;
    onImageSize?: (width: number, height: number) => void;
    onPress?: () => void;
    boxStyle?: any;
    imgStyle?: any;
}

interface IState {
    loaded: boolean;
    width: number;
    height: number;
    ratio: number;
}

export class ImageBlock extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            loaded: true,
            width: undefined,
            height: undefined,
            ratio: 1,
        };
    }

    public render() {
        return (
            <FlexBox
                {...this.props}
                style={[
                    this.props.boxStyle,
                    {
                        alignSelf: this.props.alignSelf,
                    }
                ]}
                onLayoutChange={this.onLayoutChange}
                onPress={this.props.onPress}
                width='auto'
            >
                {this.renderPlaceholder()}
                <Image
                    accessible={!!this.props.alt}
                    accessibilityLabel={this.props.alt}
                    source={{ uri: this.props.url }}
                    style={[
                        this.getSize(),
                        this.props.imgStyle
                    ]}
                    onLoad={this.onImageLoad}
                    onError={this.onImageError}
                    onLayout={this.onImageSizeUpdate}
                >
                </Image>
            </FlexBox>
        );
    }

    private renderPlaceholder = () => {
        if (!this.state.loaded) {
            return (
                <View
                    style={[
                        {
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    ]}
                >
                    <Text
                        style={{
                            fontSize: 32,
                            color: 'rgba(0, 0, 0, 0.5)',
                            textAlign: 'center'
                        }}
                    >
                        {'\uE601'}
                    </Text>
                </View>
            );
        }
        return undefined;
    }

    private fetchImageSize = () => {
        let dimension = MediaContext.getInstance().fetchDimension(this.props.url);
        if (dimension) {
            this.onImageSize(dimension.width, dimension.height);
        } else {
            Image.getSize(this.props.url, this.onImageSize, this.onImageSizeError);
        }
    }

    private onLayoutChange = (width: number, height: number) => {
        this.fetchImageSize();
    }

    private onImageSizeUpdate = (event: LayoutChangeEvent) => {
        let width = event.nativeEvent.layout.width;
        let height = event.nativeEvent.layout.height;

        console.log(`Image at url:${this.props.url} size updated. Width: ${width}, height: ${height}`);
        if (this.props.onImageSize) {
            this.props.onImageSize(width, height);
        }
    }

    private onImageSize = (width: number, height: number) => {
        console.log(`Image at url:${this.props.url} get size succeed. Width: ${width}, height: ${height}`);
        MediaContext.getInstance().cacheDimension(this.props.url, { width: width, height: height });
        let ratio = width > 0 ? height / width : height;
        if (this.props.width === 'auto') {
            this.applyAutoSize(width, ratio);
        } else if (this.props.width === 'stretch') {
            this.applyStretchSize(width, height, ratio);
        } else {
            this.applyFixSize(ratio);
        }
    }

    private onImageSizeError = () => {
        console.log(`Image at url:${this.props.url} get size failed.`);
        this.setState({
            loaded: false
        });
    }

    private onImageLoad = () => {
        console.log(`Image at url:${this.props.url} load succeed.`);
        this.setState({
            loaded: true
        });
        this.fetchImageSize();
    }

    private onImageError = () => {
        console.log(`Image at url:${this.props.url} load failed.`);
        this.setState({
            loaded: false
        });
    }

    private applyFixSize(ratio: number) {
        if (typeof this.props.width === 'number') {
            this.setState({
                width: this.props.width,
                height: this.props.width * ratio,
                ratio: ratio,
            });
        }
        // ignore other values.
    }

    private applyStretchSize(width: number, height: number, ratio: number) {
        if (this.props.containerWidth) {
            let finalWidth = this.props.containerWidth;
            let finalHeight = finalWidth * ratio;
            console.log(`Image at url:${this.props.url} get size succeed. Final width: ${finalWidth}, final height: ${finalHeight}`);
            this.setState({
                width: finalWidth,
                height: finalHeight,
                ratio: ratio
            });
        } else {
            this.setState({
                width: width,
                height: height,
                ratio: ratio
            });
        }
    }

    private applyAutoSize(width: number, ratio: number) {
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

    private getSize() {
        let finalWidth = this.state.width;
        let finalHeight = this.state.height;
        if (this.state.width && this.state.height) {
            if (this.state.ratio <= 1) {
                // Width is larger
                if (this.props.maxWidth && finalWidth > this.props.maxWidth) {
                    finalWidth = this.props.maxWidth;
                }
                finalHeight = finalWidth * this.state.ratio;
                if (this.props.maxHeight && finalHeight > this.props.maxHeight) {
                    finalHeight = this.props.maxHeight;
                    finalWidth = this.state.ratio > 0 ? finalHeight / this.state.ratio : finalWidth;
                }
            } else {
                // Height is larger
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
