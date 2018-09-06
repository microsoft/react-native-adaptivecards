import * as React from 'react';
import { Image, View } from 'react-native';
import { UrlUtils } from '../../Utils/UrlUtils';
import { Svg } from './Svg';
import { Touchable } from './Touchable';
export class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.onError = (err) => {
            console.log(err);
            this.setState({
                loaded: false
            });
        };
        this.state = {
            loaded: true,
        };
    }
    render() {
        if (this.props.onPress) {
            return this.renderTouchableBlock();
        }
        else {
            return this.renderNonTouchableBlock();
        }
    }
    renderTouchableBlock() {
        return (React.createElement(Touchable, { onPress: this.props.onPress, onLayout: this.props.onLayout, style: {
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
            } },
            this.renderPlaceholder(),
            this.renderImage()));
    }
    renderNonTouchableBlock() {
        return (React.createElement(View, { style: {
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
            }, onLayout: this.props.onLayout },
            this.renderPlaceholder(),
            this.renderImage()));
    }
    renderPlaceholder() {
        if (this.state.loaded && !UrlUtils.isDeepLink(this.props.url)) {
            return undefined;
        }
        let source = this.props.mode === 'avatar' ?
            require('../../Assets/Images/Placeholders/avatar_default.png') :
            require('../../Assets/Images/Placeholders/image_default.png');
        return (React.createElement(Image, { source: source, accessible: !!this.props.alt, accessibilityLabel: this.props.alt, style: [
                {
                    maxHeight: '100%',
                    maxWidth: '100%',
                    width: this.props.width,
                    height: this.props.height,
                },
                this.borderRadius,
                this.props.style
            ], resizeMethod: 'resize', resizeMode: 'contain' }));
    }
    renderImage() {
        if (UrlUtils.isSvgXml(this.props.url)) {
            return (React.createElement(View, { style: [
                    {
                        width: this.props.width,
                        height: this.props.height,
                        overflow: 'hidden',
                    },
                    this.borderRadius,
                    this.props.style
                ] },
                React.createElement(Svg, { url: this.props.url })));
        }
        else {
            if (UrlUtils.isDeepLink(this.props.url)) {
                return undefined;
            }
            return (React.createElement(Image, { source: { uri: this.props.url }, accessible: !!this.props.alt, accessibilityLabel: this.props.alt, style: [
                    {
                        maxHeight: '100%',
                        maxWidth: '100%',
                        width: this.props.width,
                        height: this.props.height,
                    },
                    this.borderRadius,
                    this.props.style
                ], resizeMethod: 'resize', resizeMode: 'contain', onError: this.onError }));
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
}
