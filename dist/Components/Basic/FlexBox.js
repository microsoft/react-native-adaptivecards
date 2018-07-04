import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
export class FlexBox extends React.Component {
    constructor(props) {
        super(props);
        this.renderChildren = () => {
            if (this.props.children) {
                return React.Children.map(this.props.children, (child, index) => {
                    if (child) {
                        if (typeof child !== 'string' && typeof child !== 'number') {
                            if (this.props.width === 'auto') {
                                return React.cloneElement(child, {
                                    containerWidth: this.props.containerWidth,
                                    containerHeight: this.props.containerHeight
                                });
                            }
                            else {
                                return React.cloneElement(child, {
                                    containerWidth: this.state.width,
                                    containerHeight: this.state.height
                                });
                            }
                        }
                    }
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
        this.getFlexStyle = () => {
            if (this.props.flex) {
                return {
                    flex: this.props.flex
                };
            }
            return {};
        };
        this.getChildrenFlexStyle = () => {
            let result = {
                flexDirection: this.props.flexDirection,
                alignItems: this.props.wrap === 'wrap' ? 'flex-start' : this.props.alignItems,
                justifyContent: this.props.justifyContent,
                height: this.props.height,
                flexWrap: this.props.wrap,
            };
            return result;
        };
        this.getSizeStyle = () => {
            if (this.props.width === 'auto') {
                return {
                    flex: 0
                };
            }
            if (this.props.width === 'stretch') {
                return {
                    flex: 1
                };
            }
            if (this.props.relativeWidth && typeof this.props.width === 'number') {
                return {
                    flex: this.props.width
                };
            }
            return {
                width: this.props.width
            };
        };
        this.getVerticalMarginStyle = () => {
            if (this.props.vIndex > 0) {
                return {
                    marginTop: this.props.vSpace,
                };
            }
            return {};
        };
        this.getHorizontalMarginStyle = () => {
            if (this.props.hIndex > 0) {
                return {
                    marginLeft: this.props.hSpace,
                };
            }
            return {};
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
                this.getChildrenFlexStyle(),
                this.getFlexStyle(),
                this.getSizeStyle(),
                this.getVerticalMarginStyle(),
                this.getHorizontalMarginStyle(),
                this.props.style,
            ], onLayout: this.onLayoutChange }, this.renderChildren()));
    }
    renderTouchableBox() {
        return (React.createElement(TouchableOpacity, { style: [
                this.getChildrenFlexStyle(),
                this.getFlexStyle(),
                this.getSizeStyle(),
                this.getVerticalMarginStyle(),
                this.getHorizontalMarginStyle(),
                this.props.style,
            ], onLayout: this.onLayoutChange, onPress: this.props.onPress }, this.renderChildren()));
    }
}
