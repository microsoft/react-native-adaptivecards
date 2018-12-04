var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { Image as ReactNativeImage, View } from 'react-native';
import { Svg } from 'react-native-svg-component';
import { UrlUtils } from '../../Utils/Url';
import { safe } from '../Shared/Safe';
let Image = class Image extends React.Component {
    constructor(props) {
        super(props);
        this.onError = (err) => {
            console.log(err);
            this.setState({
                loaded: false
            }, () => {
                if (this.props.onError) {
                    this.props.onError(err);
                }
            });
        };
        this.onLoad = (data) => {
            if (this.props.onLoad) {
                this.props.onLoad(data);
            }
        };
        this.state = {
            loaded: true,
        };
    }
    static getSize(url, success, failure) {
        return ReactNativeImage.getSize(url, success, failure);
    }
    render() {
        return [
            this.renderPlaceholder(),
            this.renderImage()
        ];
    }
    renderPlaceholder() {
        if (this.state.loaded && !UrlUtils.isDeepLink(this.props.url)) {
            return undefined;
        }
        let source = this.props.mode === 'avatar' ?
            require('../../Assets/Images/Placeholders/avatar_default.png') :
            require('../../Assets/Images/Placeholders/image_default.png');
        return (React.createElement(ReactNativeImage, { key: 'Placeholder', source: source, accessible: !!this.props.alt, accessibilityLabel: this.props.alt, style: [
                {
                    maxHeight: '100%',
                    maxWidth: '100%',
                    width: this.props.width,
                    height: this.props.height,
                },
                this.borderRadius,
                this.props.style
            ], resizeMethod: 'auto', resizeMode: this.props.resize }));
    }
    renderImage() {
        if (UrlUtils.isSvgXml(this.props.url)) {
            return (React.createElement(View, { key: 'SVG', style: [
                    {
                        overflow: 'hidden',
                    },
                    this.borderRadius,
                    this.props.style
                ] },
                React.createElement(Svg, { source: { uri: this.props.url }, alt: this.props.alt, width: this.props.width, height: this.props.height })));
        }
        else {
            if (UrlUtils.isDeepLink(this.props.url)) {
                return undefined;
            }
            return (React.createElement(ReactNativeImage, { key: 'Image', source: { uri: UrlUtils.toAbsolute(this.props.url, this.props.host) }, accessible: !!this.props.alt, accessibilityLabel: this.props.alt, style: [
                    {
                        maxHeight: '100%',
                        maxWidth: '100%',
                        width: this.props.width,
                        height: this.props.height,
                    },
                    this.borderRadius,
                    this.props.style
                ], resizeMethod: 'auto', resizeMode: this.props.resize, onLoad: this.onLoad, onError: this.onError }));
        }
    }
    get borderRadius() {
        if (this.props.mode === 'avatar') {
            return {
                borderRadius: this.props.width / 2,
            };
        }
        else {
            return {};
        }
    }
};
Image = __decorate([
    safe
], Image);
export { Image };
