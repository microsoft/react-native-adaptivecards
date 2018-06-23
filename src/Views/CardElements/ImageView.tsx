import * as React from 'react';
import {
    Image,
    LayoutChangeEvent,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { ImageElement } from '../../Schema/CardElements/Image';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { FlexBox } from '../Basic/FlexBox';
import { IFormElementViewProps } from '../Shared/BaseProps';

interface IProps extends IFormElementViewProps<ImageElement> {
    maxSize?: number;
}

interface IState {
    loaded: boolean;
    containerWidth: number;
    containerHeight: number;
    width: number;
    height: number;
    ratio: number;
}

export class ImageView extends React.Component<IProps, IState> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

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

    public render() {
        console.log(`element.align:' ${this.props.element.horizontalAlignment} config.align: ${this.styleConfig.alignSelf}`);
        return (
            <FlexBox
                size={this.styleConfig.imgSize}
                index={this.props.index}
                spacing={this.styleConfig.spacing}
                align={this.styleConfig.alignSelf}
                onLayout={this.onLayout}
            >
                {this.renderPlaceholder()}
                {this.renderImg()}
            </FlexBox>
        );
    }

    private renderPlaceholder() {
        if (!this.state.loaded) {
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
        return undefined;
    }

    private renderImg() {
        let size = this.getSize();
        return (
            <Image
                accessible={!!this.props.element.altText}
                accessibilityLabel={this.props.element.altText || undefined}
                style={[
                    {
                        overflow: 'hidden',
                        borderColor: 'red',
                        borderWidth: 1,
                    },
                    size,
                    this.getRadius(size.width)
                ]}
                source={{ uri: this.props.element.url }}
                onLoad={this.onLoad}
                onError={this.onError}
                resizeMode={'cover'}
                resizeMethod={'auto'}
            />
        );
    }

    private onLayout = (event?: LayoutChangeEvent) => {
        let width = event.nativeEvent.layout.width;
        let height = event.nativeEvent.layout.height;

        this.setState({
            containerWidth: width,
            containerHeight: height,
        });
    }

    private onLoad = () => {
        Image.getSize(this.props.element.url, this.onFetchSize, this.onFetchSizeError);
    }

    private onError = () => {
        console.error(`ImageView failed to load url: ${this.props.element.url}`);
    }

    private onFetchSize = (width: number, height: number) => {
        this.setState({
            loaded: true,
            ratio: height / (width > 0 ? width : 1),
            width: width,
            height: height,
        });
    }

    private onFetchSizeError = (err: any) => {
        console.error(err);
    }

    private getRadius = (width: number) => {
        if (this.props.element.style === 'person') {
            return {
                borderRadius: width / 2,
            };
        }
        return {};
    }

    private getSize = () => {
        if (this.styleConfig.imgSize === 'auto') {
            return this.getAutoSize();
        }
        if (this.styleConfig.imgSize === 'stretch') {
            return this.getStretchSize();
        }
        return this.getSpecifiedSize();
    }

    private getAutoSize = () => {
        let finalWidth = this.state.width;
        if (finalWidth > this.state.containerWidth) {
            finalWidth = this.state.containerWidth;
        }
        return {
            width: finalWidth,
            height: finalWidth * this.state.ratio
        };
    }

    private getStretchSize = () => {
        return {
            width: this.state.containerWidth,
            height: this.state.containerWidth * this.state.ratio
        };
    }

    private getSpecifiedSize = () => {
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
    }
}
