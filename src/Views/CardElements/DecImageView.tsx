import React from 'react';
import {
    FlexAlignType,
    Image,
    LayoutChangeEvent,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { ImageElement } from '../../Schema/CardElements/Image';
import {
    FlexImageAlignment,
    HorizontalAlignment,
    ImageSize,
    ImageStyle,
} from '../../Shared/Enums';
import { IElementViewProps } from '../Shared/BaseProps';
import { DecStyleManager } from '../Styles/DecStyleManager';

const IMAGE_MIN_SIZE = 18;
const enum ImageFit {
    FlexibleWidth,
    FlexibleHeight
}

interface IProps extends IElementViewProps<ImageElement> {
}

interface IState {
    viewWidth: number;
    viewHeight: number;
    imageAspectRatio: number;
    imageLoadSuccess: boolean;
}

export class DecImageView extends React.PureComponent<IProps, IState> {
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

    public componentWillUnmount() {
        this.isComponentUnmounted = true;
    }

    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        const dimensions = element.isFixedSize() ?
            {
                width: DecStyleManager.getInstance().getImageSize(element.size),
                height: DecStyleManager.getInstance().getImageSize(element.size),
            } :
            this.getDimensionsForBestFit();
        const borderRadius = element.style === ImageStyle.Person && dimensions ?
            dimensions.width / 2 :
            undefined;

        return (
            <View
                style={DecStyleManager.getInstance().isHorizontalImageSet() ? undefined : { flex: 1 }}
                onLayout={this.onLayout}
            >
                {
                    this.state.imageLoadSuccess ?
                        undefined :
                        this.renderPlaceholder()
                }
                <Image
                    accessible={!!element.altText}
                    accessibilityLabel={element.altText || undefined}
                    style={{
                        overflow: 'hidden',
                        width: dimensions ? dimensions.width : undefined,
                        height: dimensions ? dimensions.height : undefined,
                        alignSelf: this.getImageAlignment(element.horizontalAlignment, element.size),
                        borderRadius: borderRadius
                    }}
                    source={{ uri: element.url }}
                    onLoad={this.onLoad}
                    onError={this.onError}
                    resizeMode={'cover'}
                    resizeMethod={'auto'}
                />
            </View>
        );
    }

    private renderPlaceholder() {
        return (
            <View
                style={[
                    StyleSheet.absoluteFill,
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

    private onLayout = (event?: LayoutChangeEvent) => {
        const { element } = this.props;

        if (element.isFixedSize()) {
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
        const { element } = this.props;

        Image.getSize(element.url, (width: number, height: number) => {

            console.log('AdaptiveCard Image getSize', width, height);

            if (!this.isComponentUnmounted && width) {
                this.setState({
                    imageAspectRatio: height / width
                });
            }
        }, () => {
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
                width: this.state.viewWidth || IMAGE_MIN_SIZE,
                height: this.state.viewHeight || IMAGE_MIN_SIZE
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
