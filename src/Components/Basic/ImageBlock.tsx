import * as React from 'react';
import {
    Image,
    LayoutChangeEvent,
    Text,
    View
} from 'react-native';
import { ImageUtils } from '../../Shared/Utils';
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
            loaded: true,
            width: undefined,
            height: undefined,
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
        ImageUtils.fetchSize(
            this.props.url,
            this.onImageSize,
            this.onImageSizeError
        );
    }

    private onLayoutChange = (width: number, height: number) => {
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
            this.props.width,
            this.props.fitAxis
        );
        this.setState(size);
    }

    private onImageSizeError = () => {
        this.setState({
            loaded: false
        });
    }

    private onImageLoad = () => {
        this.setState({
            loaded: true
        });
        this.fetchImageSize();
    }

    private onImageError = () => {
        this.setState({
            loaded: false
        });
    }

    private getSize() {
        return ImageUtils.fitSize(
            this.state,
            { width: this.props.maxWidth, height: this.props.maxHeight },
            { width: this.props.maxWidth, height: this.props.maxHeight },
            this.props.fitAxis,
        );
    }
}
