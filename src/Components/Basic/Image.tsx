import * as React from 'react';
import {
    Image as ReactNativeImage,
    ImageStyle,
    StyleProp,
    View
} from 'react-native';
import { Svg } from 'react-native-svg-component';

import { UrlUtils } from '../../Utils/Url';
import { safe } from '../Shared/Safe';

interface IProps {
    url: string;
    host: string;
    alt?: string;
    mode?: 'avatar' | 'default';
    resize?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    width?: number;
    height?: number;
    style?: StyleProp<ImageStyle>;
    onLoad?: (data: any) => void;
    onError?: (error: any) => void;
}

interface IState {
    loaded: boolean;
}

@safe
export class Image extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            loaded: true,
        };
    }

    public static getSize(url: string, success: (width: number, height: number) => void, failure: (error: any) => void) {
        return ReactNativeImage.getSize(url, success, failure);
    }

    public render() {
        return [
            this.renderPlaceholder(),
            this.renderImage()
        ];
    }

    private renderPlaceholder() {
        if (this.state.loaded && !UrlUtils.isDeepLink(this.props.url)) {
            return undefined;
        }

        let source = this.props.mode === 'avatar' ?
            require('../../Assets/Images/Placeholders/avatar_default.png') :
            require('../../Assets/Images/Placeholders/image_default.png');

        return (
            <ReactNativeImage
                key='Placeholder'
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
                resizeMethod='auto'
                resizeMode={this.props.resize}
            />
        );
    }

    private renderImage() {
        if (UrlUtils.isSvgXml(this.props.url)) {
            return (
                <View
                    key='SVG'
                    style={[
                        {
                            overflow: 'hidden',
                        },
                        this.borderRadius,
                        this.props.style
                    ]}
                >
                    <Svg
                        source={{uri: this.props.url}}
                        alt={this.props.alt}
                        width={this.props.width}
                        height={this.props.height}
                    />
                </View>
            );
        } else {
            if (UrlUtils.isDeepLink(this.props.url)) {
                return undefined;
            }

            return (
                <ReactNativeImage
                    key='Image'
                    source={{ uri: UrlUtils.toAbsolute(this.props.url, this.props.host) }}
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
                    resizeMethod='auto'
                    resizeMode={this.props.resize}
                    onLoad={this.onLoad}
                    onError={this.onError}
                />
            );
        }
    }

    private onError = (err: any) => {
        console.log(err);
        this.setState({
            loaded: false
        }, () => {
            if (this.props.onError) {
                this.props.onError(err);
            }
        });
    }

    private onLoad = (data: any) => {
        if (this.props.onLoad) {
            this.props.onLoad(data);
        }
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
