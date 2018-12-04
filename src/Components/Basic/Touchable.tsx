import * as React from 'react';
import {
    AccessibilityRole,
    DeviceEventEmitter,
    LayoutChangeEvent,
    Platform,
    StyleProp,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { Guid } from '../../Shared/Guid';

interface IProps {
    testId?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    accessibilityLabel?: string;
    accessibilityRole?: AccessibilityRole; 
    hitSlop?: object;
    activeOpacity?: number;
    onPress: (data: any) => void;
    onLongPress?: (data: any) => void;
    onLayout?: (event: LayoutChangeEvent) => void;
}

export class Touchable extends React.Component<IProps> {
    private testId: string;

    constructor(props: IProps) {
        super(props);

        this.testId = this.props.testId + Guid.newGuid();
    }

    public componentDidMount() {
        if (Platform.OS === 'android') {
            DeviceEventEmitter.addListener('KeyEnter' + this.testId, this.props.onPress);
        }
    }

    public componentWillUnmount() {
        if (Platform.OS === 'android') {
            DeviceEventEmitter.removeListener('KeyEnter' + this.testId, this.props.onPress);
        }
    }

    public render() {
        const {
            onLongPress,
            accessibilityLabel,
            accessibilityRole,
            activeOpacity,
            hitSlop,
            style,
            disabled,
        } = this.props;

        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback
                    disabled={disabled}
                    onPress={this.onPress}
                    onLongPress={onLongPress}
                    accessible={true}
                    testID={this.testId}
                    useForeground={true}
                    hitSlop={hitSlop}
                    background={TouchableNativeFeedback.SelectableBackground()}
                    accessibilityLabel={accessibilityLabel}
                    accessibilityRole={accessibilityRole === undefined ? 'button' : accessibilityRole}
                    onLayout={this.props.onLayout}
                >
                    <View
                        style={style}
                    >
                        {this.props.children}
                    </View>
                </TouchableNativeFeedback>);
        } else {
            return (
                <TouchableOpacity
                    disabled={disabled}
                    onPress={this.onPress}
                    onLongPress={onLongPress}
                    accessible={true}
                    testID={this.testId}
                    activeOpacity={activeOpacity}
                    style={style}
                    hitSlop={hitSlop}
                    accessibilityLabel={accessibilityLabel}
                    accessibilityRole={accessibilityRole === undefined ? 'button' : accessibilityRole}
                    onLayout={this.props.onLayout}
                >
                    {this.props.children}
                </TouchableOpacity>
            );
        }
    }

    private onPress = (data: any) => {
        if (!this.props.disabled) {
            if (this.props.onPress) {
                this.props.onPress(data);
            }
        }
    }
}
