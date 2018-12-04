import * as React from 'react';
import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import ReactNativeVideo, { LoadError } from 'react-native-video';

import { MimeUtils } from '../../Utils/Mime';
import { UrlUtils } from '../../Utils/Url';
import { safe } from '../Shared/Safe';

interface IProps {
    url: string;
    host: string;
    alt: string;
    mime: string;
    poster?: string;
    paused?: boolean;
    resize?: 'cover' | 'contain' | 'stretch' | 'none';
    style?: StyleProp<ViewStyle>;
    onLoadStart?: () => void;
    onLoad?: () => void;
    onEnd?: () => void;
    onError?: (error: LoadError) => void;
}

interface IState {
    height: number;
    width: number;
}

@safe
export class Media extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };
    }

    public render() {
        if (UrlUtils.isDeepLink(this.props.url)) {
            return undefined;
        }

        return (
            <ReactNativeVideo
                source={{ uri: UrlUtils.toAbsolute(this.props.url, this.props.host) }}
                poster={UrlUtils.toAbsolute(this.props.poster, this.props.host)}
                accessible={!!this.props.alt}
                accessibilityLabel={this.props.alt}
                allowsExternalPlayback={false}
                audioOnly={MimeUtils.isAudio(this.props.mime)}
                playInBackground={true}
                playWhenInactive={false}
                ignoreSilentSwitch='ignore'
                resizeMode={this.props.resize}
                paused={this.props.paused}
                style={[
                    {
                        alignSelf: 'stretch',
                        height: this.state.height
                    },
                    this.props.style
                ]}
                onLoadStart={this.onLoadStart}
                onLoad={this.onLoad}
                onEnd={this.onEnd}
                onError={this.onError}
                onLayout={this.onLayout}
            />
        );
    }

    private onError = (error: LoadError) => {
        if (this.props.onError) {
            this.props.onError(error);
        }
    }

    private onEnd = () => {
        if (this.props.onEnd) {
            this.props.onEnd();
        }
    }

    private onLoad = () => {
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }

    private onLoadStart = () => {
        if (this.props.onLoadStart) {
            this.props.onLoadStart();
        }
    }

    private onLayout = (event: LayoutChangeEvent) => {
        if (event && event.nativeEvent.layout && event.nativeEvent.layout.width >= 0) {
            let width = event.nativeEvent.layout.width;
            let height = event.nativeEvent.layout.width / 16 * 9;
            this.setState({
                width: width,
                height: height
            });
        }
    }
}
