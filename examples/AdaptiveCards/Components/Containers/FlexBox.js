import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
export class FlexBox extends React.Component {
    constructor(props) {
        super(props);
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
            width: this.props.width !== undefined ? this.props.width : 0,
            height: this.props.width !== undefined ? this.props.width : 0,
        };
    }
    render() {
        if (this.props.onPress) {
            return this.renderTouchable();
        }
        else {
            return this.renderNonTouchable();
        }
    }
    renderNonTouchable() {
        return (React.createElement(View, { style: [
                this.selfAlignment,
                this.childrenAlignment,
                this.margin,
                this.padding,
                this.props.style
            ], onLayout: this.onLayoutChange }, this.props.children));
    }
    renderTouchable() {
        return (React.createElement(TouchableOpacity, { style: [
                this.selfAlignment,
                this.childrenAlignment,
                this.margin,
                this.padding,
                this.props.style
            ], onPress: this.props.onPress, onLayout: this.onLayoutChange }, this.props.children));
    }
    get childrenAlignment() {
        return {
            alignItems: this.props.alignItems,
            alignContent: this.props.alignContent,
            justifyContent: this.props.justifyContent,
            flexDirection: this.props.flexDirection,
            flexWrap: this.props.flexWrap,
        };
    }
    get selfAlignment() {
        return {
            alignSelf: this.props.alignSelf,
            flex: this.props.flex,
            width: this.props.width,
            height: this.props.height,
        };
    }
    get margin() {
        return {
            marginTop: this.props.marginTop,
            marginRight: this.props.marginRight,
            marginBottom: this.props.marginBottom,
            marginLeft: this.props.marginLeft,
        };
    }
    get padding() {
        return {
            paddingTop: this.props.paddingTop,
            paddingRight: this.props.paddingRight,
            paddingBottom: this.props.paddingBottom,
            paddingLeft: this.props.paddingLeft,
        };
    }
}
