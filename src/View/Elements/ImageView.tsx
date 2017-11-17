import React from 'react';
import {
    View,
    Text,
    Image,
    LayoutChangeEvent,
    FlexAlignType,
    StyleSheet,
} from 'react-native';

import {
    HorizontalAlignment,
    ImageSize,
    ImageStyle,
    FlexImageAlignment,
} from '../../Schema/enums';
import styleManager from '../Style/styleManager';
import { ICardElementViewProps } from '../view.d';
import CardElementWrapper from '../Shared/CardElementWrapper';
import AdaptiveImage from '../../Schema/Elements/Image';

const IMAGEMINSIZE = 18;
const enum ImageFit {
    FlexibleWidth,
    FlexibleHeight
}

interface IProps extends ICardElementViewProps {
    image: AdaptiveImage;
}
interface IState {
    viewWidth: number;
    viewHeight: number;
    imageAspectRatio: number;
    imageLoadSuccess: boolean;
}

export default class ImageView extends React.PureComponent<IProps, IState> {
    private isComponentUnmounted: Boolean;
    private fitStyle?: ImageFit;

    constructor(props: IProps) {
        super(props);

        this.state = {
            viewWidth: 0,
            viewHeight: 0,
            imageAspectRatio: 1,
            imageLoadSuccess: true,
        };
    }

    componentWillUnmount() {
        this.isComponentUnmounted = true;
    }

    render(): JSX.Element {
        const { image, index } = this.props;

        if (!image || !image.isValid()) {
            return null;
        }

        const dimensions = image.isFixedSize() ?
            {
                width: styleManager.getImageSize(image.size),
                height: styleManager.getImageSize(image.size),
            } :
            this.getDimensionsForBestFit();
        const borderRadius = image.style === ImageStyle.Person && dimensions ?
            dimensions.width / 2 :
            undefined;

        return <CardElementWrapper cardElement={image} index={index} style={
            styleManager.isHorizontalImageSet() ? undefined : { flex: 1 }
        }>
            <View style={{ flex: 1 }} onLayout={this.onLayout}>
                {
                    this.state.imageLoadSuccess ?
                        undefined :
                        this.renderPlaceholder()
                }
                <Image
                    accessible={!!image.altText}
                    accessibilityLabel={image.altText || undefined}
                    style={{
                        overflow: 'hidden',
                        width: dimensions ? dimensions.width : undefined,
                        height: dimensions ? dimensions.height : undefined,
                        alignSelf: this.getImageAlignment(image.horizontalAlignment, image.size),
                        borderRadius: borderRadius
                    }}
                    source={{ uri: image.url }}
                    onLoad={this.onLoad}
                    onError={this.onError}
                    resizeMode={'cover'}
                    resizeMethod={'auto'}
                />
            </View>
        </CardElementWrapper>;
    }

    private renderPlaceholder() {
        return <View style={[
            StyleSheet.absoluteFill,
            {
                alignItems: 'center',
                justifyContent: 'center'
            }
        ]} >
            <Text style={{
                fontSize: 32,
                color: 'rgba(0, 0, 0, 0.5)',
                textAlign: 'center'
            }}>
                {'\uE601'}
            </Text>
        </View>;
    }

    private onLayout = (event?: LayoutChangeEvent) => {
        const { image } = this.props;

        if (image.isFixedSize()) {
            return;
        }

        let width = event.nativeEvent.layout.width;
        let height = event.nativeEvent.layout.height;

        console.log('AdaptiveCard Image onLayout', width, height);
        if (!this.fitStyle) {
            this.fitStyle = width !== 0 && height === 0 ? ImageFit.FlexibleHeight : ImageFit.FlexibleWidth;
        }
        this.setState({
            viewWidth: width,
            viewHeight: height
        });
    }

    private onLoad = () => {
        const { image } = this.props;

        Image.getSize(image.url, (width: number, height: number) => {

            console.log('AdaptiveCard Image getSize', width, height);

            if (!this.isComponentUnmounted && width) {
                this.setState({
                    imageAspectRatio: height / width
                });
            }
        }, (error: any) => {
            // TODO:
            console.error('failed to get image size of commute url, error');
        });
    }

    private onError = () => {
        if (!this.isComponentUnmounted) {
            this.setState({
                imageLoadSuccess: false,
            });
        }
    }

    // TODO: Dimension types | undefined
    private getDimensionsForBestFit = () => {
        if (this.state.imageAspectRatio) {
            switch (this.fitStyle) {
                case ImageFit.FlexibleHeight:
                    if (this.state.viewWidth) {
                        return {
                            height: Math.floor(this.state.viewWidth * this.state.imageAspectRatio),
                            width: this.state.viewWidth
                        };
                    }
                    break;
                case ImageFit.FlexibleWidth:
                    if (this.state.viewHeight) {
                        let dimensions = {
                            width: Math.floor(this.state.viewHeight / this.state.imageAspectRatio),
                            height: this.state.viewHeight
                        };
                        if (this.state.viewWidth && dimensions.width > this.state.viewWidth) {
                            dimensions.width = this.state.viewWidth;
                        }
                        return dimensions;
                    }
                    break;
            }
        } else if (this.fitStyle !== undefined) {
            return {
                width: this.state.viewWidth || IMAGEMINSIZE,
                height: this.state.viewHeight || IMAGEMINSIZE
            };
        }

        return undefined;
    }

    private getImageAlignment(alignment: HorizontalAlignment, imageSize: ImageSize) {
        let imageAlignment: string;

        if (imageSize === ImageSize.Stretch) {
            imageAlignment = FlexImageAlignment.Stretch;
        } else {
            switch (alignment) {
                case HorizontalAlignment.Left:
                    imageAlignment = FlexImageAlignment.FlexStart;
                    break;
                case HorizontalAlignment.Right:
                    imageAlignment = FlexImageAlignment.FlexEnd;
                    break;
                case HorizontalAlignment.Center:
                default:
                    imageAlignment = FlexImageAlignment.Center;
                    break;
            }
        }

        return imageAlignment as FlexAlignType;
    }
}
