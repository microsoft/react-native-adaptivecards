import * as React from 'react';
import {
    Image,
    LayoutChangeEvent,
} from 'react-native';
import { HostContext } from '../../../Contexts/HostContext';
import { HostRenderer, ISVGRenderer } from '../../../HostRenderer/HostRenderer';
import { StyleManager } from '../../../Styles/StyleManager';
import { ImageUtils } from '../../../Utils/ImageUtils';
import { IFlexProps } from '../BaseProps';
import { FlexBox } from './FlexBox';

interface IProps extends IFlexProps {
    url: string;
    alt?: string;
    maxWidth?: number;
    maxHeight?: number;
    fitAxis?: 'h' | 'v';
    onImageSize?: (width: number, height: number) => void;
    onPress?: () => void;
    boxStyle?: any;
    imgStyle?: any;
    source: 'internal' | 'external';
    mode: 'default' | 'avatar';
}

interface IState {
    loaded: boolean;
    width: number;
    height: number;
}

export class ImageBlock extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            loaded: false,
            width: undefined,
            height: undefined,
        };
    }

    public render() {
        const {
            url,
            boxStyle,
            alignSelf,
            onPress,
            size,
        } = this.props;

        if (url && (url.startsWith('data:image/svg+xml') || url.endsWith('.svg'))) {
            let svgRenderer: ISVGRenderer = HostContext.getInstance().getHostRenderer(HostRenderer.SVG);
            let svgSize = typeof size === 'number' ?
                size : StyleManager.getInstance().getImageSize('large') as number;
            if (svgRenderer) {
                return (
                    <FlexBox
                        {...this.props}
                        style={[
                            boxStyle,
                            {
                                alignSelf: alignSelf,
                            }
                        ]}
                        onPress={onPress}
                        size='auto'
                    >
                        {svgRenderer(decodeURIComponent(url), svgSize, svgSize)}
                    </FlexBox>
                );
            } else {
                return undefined;
            }
        } else {
            return (
                <FlexBox
                    {...this.props}
                    style={[
                        boxStyle,
                        {
                            alignSelf: alignSelf,
                        }
                    ]}
                    onLayoutChange={this.onLayoutChange}
                    onPress={onPress}
                    size='auto'
                >
                    {this.renderPlaceholder()}
                    {this.renderImage()}
                </FlexBox>
            );
        }
    }

    private renderPlaceholder = () => {
        if (!this.state.loaded) {
            const source = this.props.mode === 'avatar' ?
                require('../../../Assets/Images/Placeholders/avatar_default.png') :
                require('../../../Assets/Images/Placeholders/image_default.png');
            if (typeof (this.props.size) === 'number') {
                return (
                    <Image
                        accessible={!!this.props.alt}
                        accessibilityLabel={this.props.alt}
                        source={source}
                        style={[
                            {
                                width: this.props.size,
                                height: this.props.size
                            },
                            this.props.imgStyle
                        ]}
                    />
                );
            }
        }
        return undefined;
    }

    private renderImage() {
        if (this.props.source === 'external') {
            return (
                <Image
                    accessible={!!this.props.alt}
                    accessibilityLabel={this.props.alt}
                    source={{ uri: this.props.url }}
                    style={[
                        this.size,
                        this.props.imgStyle
                    ]}
                    onError={this.onImageError}
                    onLayout={this.onImageSizeUpdate}
                />
            );
        }
        return undefined;
    }

    private fetchImageSize = () => {
        if (this.props.source === 'external') {
            ImageUtils.fetchSize(
                this.props.url,
                this.onImageSize,
                this.onImageSizeError
            );
        }
    }

    private onLayoutChange = () => {
        this.fetchImageSize();
    }

    private onImageSizeUpdate = (event: LayoutChangeEvent) => {
        let width = event.nativeEvent.layout.width;
        let height = event.nativeEvent.layout.height;

        if (this.props.onImageSize) {
            this.props.onImageSize(width, height);
        }
    }

    private onImageSize = (width: number, height: number) => {
        let size = ImageUtils.calcSize(
            { width: width, height: height },
            { width: this.props.containerWidth, height: this.props.containerHeight },
            this.props.size,
            this.props.fitAxis
        );
        this.setState({
            loaded: true,
            width: size.width,
            height: size.height
        });
    }

    private onImageSizeError = (err: any) => {
        console.log(err);
        console.log(this.props.url);
        this.setState({
            loaded: false
        });
    }

    private onImageError = () => {
        this.setState({
            loaded: false
        });
    }

    private get size() {
        return ImageUtils.fitSize(
            this.state,
            { width: this.props.maxWidth, height: this.props.maxHeight },
            { width: this.props.maxWidth, height: this.props.maxHeight },
            this.props.fitAxis,
        );
    }
}
