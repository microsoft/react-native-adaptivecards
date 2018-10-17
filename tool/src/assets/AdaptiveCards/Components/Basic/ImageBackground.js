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
        this.onLayout = (event) => {
            let width = event.nativeEvent.layout.width;
            let height = event.nativeEvent.layout.height;
            if (width > 0 && height > 0) {
                this.setState({
                    containerRatio: width / height,
                });
            }
        };
        this.fetchImageSize = () => {
            const { url } = this.props;
            if (url) {
                let realUrl;
                if (/\?[a-zA-Z]+=/.test(url)) {
                    realUrl = url + '&ms_cox_timestamp=' + (new Date()).getTime();
                }
                else {
                    realUrl = url + '?ms_cox_timestamp=' + (new Date()).getTime();
                }
                Image.getSize(realUrl, (width, height) => {
                    if (this.timer !== undefined) {
                        clearTimeout(this.timer);
                        this.timer = undefined;
                    }
                    if (width > 0 && height > 0) {
                        this.setState({
                            imgRatio: width / height,
                        });
                    }
                }, (error) => {
                    this.onError(error);
                });
            }
        };
        this.state = {
            containerRatio: 1,
            imgRatio: 1,
        };
    }
    componentDidMount() {
        setTimeout(this.fetchImageSize, 300);
        this.timer = setTimeout(this.fetchImageSize, 1500);
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
            ], onLayout: this.onLayout },
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
                if (this.state.imgRatio > this.state.containerRatio) {
                    return 'contain';
                }
                else {
                    return 'cover';
                }
        }
    }
}
