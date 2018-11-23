var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { safe } from '../Shared/Safe';
import { Image } from './Image';
let Background = class Background extends React.Component {
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
                Image.getSize(url, (width, height) => {
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
        this.fetchImageSize();
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
            React.createElement(Image, { url: this.props.url, host: this.props.host, style: [
                    StyleSheet.absoluteFill,
                    this.props.imageStyle
                ], onLoad: this.onLoad, onError: this.onError, resize: this.resize }),
            this.props.children));
    }
    get resize() {
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
};
Background = __decorate([
    safe
], Background);
export { Background };
