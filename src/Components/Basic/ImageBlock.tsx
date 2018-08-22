import * as React from 'react';
import { Image, ImageStyle, LayoutChangeEvent, StyleProp, View } from 'react-native';
import { UrlUtils } from '../../Utils/UrlUtils';
import { Svg } from './Svg';
import { Touchable } from './Touchable';

interface IProps {
    url: string;
    alt?: string;
    flex?: number;
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    width?: number;
    height?: number;
    mode?: 'avatar' | 'default';
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    style?: StyleProp<ImageStyle>;
    onPress?: () => void;
    onLayout?: (event: LayoutChangeEvent) => void;
}

interface IState {
    loaded: boolean;
}

export class ImageBlock extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            loaded: true,
        };
    }

    public render() {
        if (this.props.onPress) {
            return this.renderTouchableBlock();
        } else {
            return this.renderNonTouchableBlock();
        }
    }

    private renderTouchableBlock() {
        return (
            <Touchable
                onPress={this.props.onPress}
                onLayout={this.props.onLayout}
                style={{
                    flex: this.props.flex,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: this.props.alignSelf,
                    marginTop: this.props.marginTop,
                    marginRight: this.props.marginRight,
                    marginBottom: this.props.marginBottom,
                    marginLeft: this.props.marginLeft,
                    paddingTop: this.props.paddingTop,
                    paddingRight: this.props.paddingRight,
                    paddingBottom: this.props.paddingBottom,
                    paddingLeft: this.props.paddingLeft,
                }}
            >
                {this.renderPlaceholder()}
                {this.renderImage()}
            </Touchable>
        );
    }

    private renderNonTouchableBlock() {
        return (
            <View style={{
                flex: this.props.flex,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: this.props.alignSelf,
                marginTop: this.props.marginTop,
                marginRight: this.props.marginRight,
                marginBottom: this.props.marginBottom,
                marginLeft: this.props.marginLeft,
                paddingTop: this.props.paddingTop,
                paddingRight: this.props.paddingRight,
                paddingBottom: this.props.paddingBottom,
                paddingLeft: this.props.paddingLeft,
            }}
                  onLayout={this.props.onLayout}
            >
                {this.renderPlaceholder()}
                {this.renderImage()}
            </View>
        );
    }

    private renderPlaceholder() {
        if (this.state.loaded && !UrlUtils.isDeepLink(this.props.url)) {
            return undefined;
        }

        let source = this.props.mode === 'avatar' ?
            require('../../Assets/Images/Placeholders/avatar_default.png') :
            require('../../Assets/Images/Placeholders/image_default.png');

        return (
            <Image
                source={source}
                accessible={!!this.props.alt}
                accessibilityLabel={this.props.alt}
                style={[
                    {
                        maxHeight: '100%',
                        maxWidth: '100%',
                        width: this.props.width,
                        height: this.props.height,
                    },
                    this.borderRadius,
                    this.props.style
                ]}
                resizeMethod='resize'
                resizeMode='contain'
            />
        );
    }

    private renderImage() {
        if (UrlUtils.isSvgXml(this.props.url)) {
            return (
                <Svg
                    url={this.props.url}
                    width={this.props.width}
                    height={this.props.height}
                    style={[
                        this.borderRadius,
                        this.props.style
                    ]}
                />
            );
        } else {
            if (UrlUtils.isDeepLink(this.props.url)) {
                return undefined;
            }
            return (
                <Image
                    source={{ uri: this.props.url }}
                    accessible={!!this.props.alt}
                    accessibilityLabel={this.props.alt}
                    style={[
                        {
                            maxHeight: '100%',
                            maxWidth: '100%',
                            width: this.props.width,
                            height: this.props.height,
                        },
                        this.borderRadius,
                        this.props.style
                    ]}
                    resizeMethod='resize'
                    resizeMode='contain'
                    onError={this.onError}
                />
            );
        }
    }

    private onError = (err: any) => {
        console.log(err);
        this.setState({
            loaded: false
        });
    }

    private get borderRadius() {
        if (this.props.mode === 'avatar') {
            return {
                borderRadius: this.props.width / 2,
            };
        } else {
            return {};
        }
    }
}
