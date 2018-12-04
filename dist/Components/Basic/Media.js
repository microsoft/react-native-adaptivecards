var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import ReactNativeVideo from 'react-native-video';
import { MimeUtils } from '../../Utils/Mime';
import { UrlUtils } from '../../Utils/Url';
import { safe } from '../Shared/Safe';
let Media = class Media extends React.Component {
    constructor(props) {
        super(props);
        this.onError = (error) => {
            if (this.props.onError) {
                this.props.onError(error);
            }
        };
        this.onEnd = () => {
            if (this.props.onEnd) {
                this.props.onEnd();
            }
        };
        this.onLoad = () => {
            if (this.props.onLoad) {
                this.props.onLoad();
            }
        };
        this.onLoadStart = () => {
            if (this.props.onLoadStart) {
                this.props.onLoadStart();
            }
        };
        this.onLayout = (event) => {
            if (event && event.nativeEvent.layout && event.nativeEvent.layout.width >= 0) {
                let width = event.nativeEvent.layout.width;
                let height = event.nativeEvent.layout.width / 16 * 9;
                this.setState({
                    width: width,
                    height: height
                });
            }
        };
        this.state = {
            width: 0,
            height: 0
        };
    }
    render() {
        if (UrlUtils.isDeepLink(this.props.url)) {
            return undefined;
        }
        return (React.createElement(ReactNativeVideo, { source: { uri: UrlUtils.toAbsolute(this.props.url, this.props.host) }, poster: UrlUtils.toAbsolute(this.props.poster, this.props.host), accessible: !!this.props.alt, accessibilityLabel: this.props.alt, allowsExternalPlayback: false, audioOnly: MimeUtils.isAudio(this.props.mime), playInBackground: true, playWhenInactive: false, ignoreSilentSwitch: 'ignore', resizeMode: this.props.resize, paused: this.props.paused, style: [
                {
                    alignSelf: 'stretch',
                    height: this.state.height
                },
                this.props.style
            ], onLoadStart: this.onLoadStart, onLoad: this.onLoad, onEnd: this.onEnd, onError: this.onError, onLayout: this.onLayout }));
    }
};
Media = __decorate([
    safe
], Media);
export { Media };
