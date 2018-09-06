var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { DeviceEventEmitter, Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { Guid } from '../../Shared/Guid';
export class Touchable extends React.Component {
    constructor(props) {
        super(props);
        this.testId = this.props.testId + Guid.newGuid();
    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            DeviceEventEmitter.addListener('KeyEnter' + this.testId, this.props.onPress);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            DeviceEventEmitter.removeListener('KeyEnter' + this.testId, this.props.onPress);
        }
    }
    render() {
        const _a = this.props, { onPress, onLongPress, disabled, accessibilityLabel, accessibilityTraits, accessibilityComponentType, activeOpacity, hitSlop, style } = _a, otherProps = __rest(_a, ["onPress", "onLongPress", "disabled", "accessibilityLabel", "accessibilityTraits", "accessibilityComponentType", "activeOpacity", "hitSlop", "style"]);
        if (Platform.OS === 'android') {
            return (React.createElement(TouchableNativeFeedback, { disabled: disabled, onPress: onPress, onLongPress: onLongPress, accessible: true, testID: this.testId, useForeground: true, hitSlop: hitSlop, background: TouchableNativeFeedback.SelectableBackground(), accessibilityLabel: accessibilityLabel, onLayout: this.props.onLayout },
                React.createElement(View, Object.assign({ style: style }, otherProps))));
        }
        else {
            return (React.createElement(TouchableOpacity, { disabled: disabled, onPress: onPress, onLongPress: onLongPress, accessible: true, testID: this.testId, activeOpacity: activeOpacity, style: style, hitSlop: hitSlop, accessibilityLabel: accessibilityLabel, onLayout: this.props.onLayout }, otherProps.children));
        }
    }
}
