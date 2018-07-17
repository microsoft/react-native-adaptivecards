import React from 'react';
import { Image, StyleSheet, View, } from 'react-native';
export class ImageBackground extends React.PureComponent {
    render() {
        const { children, containerStyle, imageStyle, source } = this.props;
        return (React.createElement(View, { style: [
                containerStyle,
                {
                    position: 'relative',
                    marginTop: this.props.vIndex > 0 ? this.props.spacing : 0,
                    marginLeft: this.props.hIndex > 0 ? this.props.spacing : 0
                }
            ] },
            React.createElement(Image, { source: source, style: [
                    StyleSheet.absoluteFill,
                    imageStyle,
                ] }),
            children));
    }
}
