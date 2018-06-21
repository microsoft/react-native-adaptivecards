import * as React from 'react';
import { Image, StyleSheet, Text, View, } from 'react-native';
import { ImageStyle } from '../../Shared/Enums';
export class ImageView extends React.Component {
    constructor(props) {
        super(props);
        this.onLoad = () => {
            const { element } = this.props;
            Image.getSize(element.url, (width, height) => {
                console.log('AdaptiveCard Image getSize', width, height);
            }, () => {
                console.error('failed to get image size of commute url, error');
            });
        };
        this.onError = () => {
            console.error('Failed to load image at URL: ' + this.props.element.url);
        };
    }
    render() {
        return (React.createElement(View, null,
            this.renderPlaceholder(),
            this.renderImg()));
    }
    renderPlaceholder() {
        return (React.createElement(View, { style: [
                StyleSheet.absoluteFill,
                {
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            ] },
            React.createElement(Text, { style: {
                    fontSize: 32,
                    color: 'rgba(0, 0, 0, 0.5)',
                    textAlign: 'center'
                } }, '\uE601')));
    }
    renderImg() {
        return (React.createElement(Image, { accessible: !!this.props.element.altText, accessibilityLabel: this.props.element.altText || undefined, style: [
                StyleSheet.absoluteFill,
                {
                    borderRadius: this.decideBorderRadius()
                }
            ], source: { uri: this.props.element.url }, onLoad: this.onLoad, onError: this.onError, resizeMode: 'cover', resizeMethod: 'auto' }));
    }
    decideBorderRadius() {
        return this.props.element.style === ImageStyle.Person ? 50 : 0;
    }
}
