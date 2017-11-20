import React from 'react';
import { Image, View, StyleSheet, } from 'react-native';
export default class ImageBackground extends React.PureComponent {
    render() {
        const { children, containerStyle, imageStyle, source } = this.props;
        return React.createElement(View, { style: [
                containerStyle,
                {
                    position: 'relative',
                }
            ] },
            React.createElement(Image, { source: source, style: [
                    StyleSheet.absoluteFill,
                    imageStyle,
                ] }),
            children);
    }
}
