import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
export class FlexBox extends React.Component {
    constructor(props) {
        super(props);
        this.renderChildren = () => {
            if (this.props.children) {
                return React.Children.map(this.props.children, (child) => {
                    if (child) {
                        if (typeof child !== 'string' && typeof child !== 'number') {
                            return React.cloneElement(child, {
                                containerWidth: this.containerWidth,
                                containerHeight: this.containerHeight
                            });
                        }
                    }
                    return undefined;
                });
            }
            return undefined;
        };
        this.onLayoutChange = (event) => {
            let width = event.nativeEvent.layout.width;
            let height = event.nativeEvent.layout.height;
            this.setState({
                width: width,
                height: height
            }, () => {
                if (this.props.onLayoutChange) {
                    this.props.onLayoutChange(width, height);
                }
            });
        };
        this.state = {
            width: 0,
            height: 0,
        };
    }
    render() {
        if (this.props.onPress) {
            return this.renderTouchableBox();
        }
        return this.renderBox();
    }
    renderBox() {
        return (React.createElement(View, { style: [
                this.childrenFlex,
                this.flex,
                this.size,
                this.verticalMargin,
                this.horizontalMargin,
                this.props.style,
            ], onLayout: this.onLayoutChange }, this.renderChildren()));
    }
    renderTouchableBox() {
        return (React.createElement(TouchableOpacity, { style: [
                this.childrenFlex,
                this.flex,
                this.size,
                this.verticalMargin,
                this.horizontalMargin,
                this.props.style,
            ], onLayout: this.onLayoutChange, onPress: this.props.onPress }, this.renderChildren()));
    }
    get containerWidth() {
        if (this.props.size === 'auto') {
            return this.props.containerWidth;
        }
        else {
            return this.state.width;
        }
    }
    get containerHeight() {
        if (this.props.size === 'auto') {
            return this.props.containerHeight;
        }
        else {
            return this.state.height;
        }
    }
    get flex() {
        if (this.props.flex) {
            return {
                flex: this.props.flex
            };
        }
        return {};
    }
    get childrenFlex() {
        return {
            flexDirection: this.props.flexDirection,
            alignItems: this.props.wrap === 'wrap' ? 'flex-start' : this.props.alignItems,
            alignContent: this.props.alignContent,
            justifyContent: this.props.justifyContent,
            height: this.props.height,
            flexWrap: this.props.wrap,
        };
    }
    get size() {
        if (this.props.size === 'auto') {
            return {};
        }
        if (this.props.size === 'stretch') {
            return {
                flex: 1,
            };
        }
        if (this.props.relativeWidth && typeof this.props.size === 'number') {
            return {
                flex: this.props.size
            };
        }
        return {
            width: this.props.size
        };
    }
    get verticalMargin() {
        if (this.props.vIndex > 0) {
            return {
                marginTop: this.props.vSpacing,
            };
        }
        return {};
    }
    get horizontalMargin() {
        if (this.props.hIndex > 0) {
            return {
                marginLeft: this.props.hSpacing,
            };
        }
        return {};
    }
}
