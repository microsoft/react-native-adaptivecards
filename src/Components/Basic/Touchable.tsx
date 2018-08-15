import * as React from 'react';
import {
    AccessibilityTrait,
    DeviceEventEmitter,
    LayoutChangeEvent,
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from 'react-native';
import { Guid } from '../../Shared/Guid';

interface IProps {
    testId?: string;
    disabled?: boolean;
    style?: object;
    accessibilityLabel?: string;
    accessibilityTraits?: AccessibilityTrait | AccessibilityTrait[];
    accessibilityComponentType?: 'none' | 'button' | 'radiobutton_checked' | 'radiobutton_unchecked';
    hitSlop?: object;
    activeOpacity?: number;
    onPress: (data: any) => void;
    onLongPress?: (data: any) => void;
    onLayout?: (event: LayoutChangeEvent) => void;
}

export class Touchable extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount() {
        if (Platform.OS === 'android') {
            DeviceEventEmitter.addListener('KeyEnter' + this.props.testId, this.props.onPress);
        }
    }

    public componentWillUnmount() {
        if (Platform.OS === 'android') {
            DeviceEventEmitter.removeListener('KeyEnter' + this.props.testId, this.props.onPress);
        }
    }

    public render() {
        const {
            onPress,
            onLongPress,
            disabled,
            accessibilityLabel,
            accessibilityTraits,
            accessibilityComponentType,
            activeOpacity,
            hitSlop,
            style,
            ...otherProps
        } = this.props;

        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback
                    disabled={disabled}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    accessible={true}
                    testID={this.uniqueTestId}
                    useForeground={true}
                    hitSlop={hitSlop}
                    background={TouchableNativeFeedback.SelectableBackground()}
                    accessibilityLabel={accessibilityLabel}
                >
                    <View
                        style={style}
                        onLayout={this.props.onLayout}
                        {...otherProps}
                    />
                </TouchableNativeFeedback>);
        } else {
            return (
                <TouchableOpacity
                    disabled={disabled}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    accessible={true}
                    testID={this.uniqueTestId}
                    activeOpacity={activeOpacity}
                    style={style}
                    hitSlop={hitSlop}
                    accessibilityLabel={accessibilityLabel}
                    onLayout={this.props.onLayout}
                >
                    {otherProps.children}
                </TouchableOpacity>
            );
        }
    }

    private get uniqueTestId() {
        return this.props.testId + Guid.newGuid();
    }
}
