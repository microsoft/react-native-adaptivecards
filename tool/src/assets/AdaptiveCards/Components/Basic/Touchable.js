import * as React from 'react';
import { DeviceEventEmitter, Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { Guid } from '../../Shared/Guid';
export class Touchable extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = (data) => {
            if (!this.props.disabled) {
                if (this.props.onPress) {
                    this.props.onPress(data);
                }
            }
        };
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
        const { onLongPress, accessibilityLabel, accessibilityTraits, accessibilityComponentType, activeOpacity, hitSlop, style, disabled, } = this.props;
        if (Platform.OS === 'android') {
            return (React.createElement(TouchableNativeFeedback, { disabled: disabled, onPress: this.onPress, onLongPress: onLongPress, accessible: true, testID: this.testId, useForeground: true, hitSlop: hitSlop, background: TouchableNativeFeedback.SelectableBackground(), accessibilityLabel: accessibilityLabel, accessibilityComponentType: accessibilityComponentType === undefined ? 'button' : accessibilityComponentType, onLayout: this.props.onLayout },
                React.createElement(View, { style: style }, this.props.children)));
        }
        else {
            return (React.createElement(TouchableOpacity, { disabled: disabled, onPress: this.onPress, onLongPress: onLongPress, accessible: true, testID: this.testId, activeOpacity: activeOpacity, style: style, hitSlop: hitSlop, accessibilityLabel: accessibilityLabel, accessibilityTraits: accessibilityTraits === undefined ? 'button' : accessibilityTraits, onLayout: this.props.onLayout }, this.props.children));
        }
    }
}
