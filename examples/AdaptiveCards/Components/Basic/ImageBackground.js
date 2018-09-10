import React from 'react';
import { Image, StyleSheet, View, } from 'react-native';
export class ImageBackground extends React.Component {
    constructor(props) {
        super(props);
        this.onLoad = (data) => {
            if (this.props.onLoad) {
                this.props.onLoad(data);
            }
        };
        this.onError = (error) => {
            if (this.props.onError) {
                this.props.onError(error);
            }
        };
        this.state = {
            ratio: 1,
        };
    }
    componentDidMount() {
        const { url } = this.props;
        if (url) {
            Image.getSize(url, (width, height) => {
                if (width > 0 && height > 0) {
                    this.setState({
                        ratio: width / height,
                    });
                }
            }, (error) => {
                this.props.onError(error);
            });
        }
    }
    render() {
        return (React.createElement(View, { style: [
                {
                    flex: this.props.flex,
                    position: 'relative',
                    marginTop: this.props.marginTop,
                    marginRight: this.props.marginRight,
                    marginBottom: this.props.marginBottom,
                    marginLeft: this.props.marginLeft,
                    paddingTop: this.props.paddingTop,
                    paddingRight: this.props.paddingRight,
                    paddingBottom: this.props.paddingBottom,
                    paddingLeft: this.props.paddingLeft
                }, this.props.containerStyle
            ] },
            React.createElement(Image, { source: { uri: this.props.url }, style: [
                    StyleSheet.absoluteFill,
                    this.props.imageStyle
                ], onLoad: this.onLoad, onError: this.onError, resizeMethod: 'auto', resizeMode: this.resizeMethod }),
            this.props.children));
    }
    get resizeMethod() {
        switch (this.props.resizeMode) {
            case 'repeat':
                return 'repeat';
            case 'stretch':
            default:
                if (this.state.ratio > 1) {
                    return 'contain';
                }
                else {
                    return 'cover';
                }
        }
    }
}
