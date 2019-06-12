import * as React from 'react';
import {
    AccessibilityRole,
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

        this.state = {
            disabled: this.props.disabled
        };
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
            accessibilityRole,
            activeOpacity,
            hitSlop,
            style,
            disabled,
            ...otherProps
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
                    accessibilityLabel={this.accessibilityLabel}
                    accessibilityRole={accessibilityRole === undefined ? 'button' : accessibilityRole}
                    onLayout={this.props.onLayout}
                >
                    <View
                        style={style}
                        {...otherProps}
                    />
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
                    accessibilityLabel={this.accessibilityLabel}
                    accessibilityRole={accessibilityRole === undefined ? 'button' : accessibilityRole}
                    onLayout={this.props.onLayout}
                >
                    {otherProps.children}
                </TouchableOpacity>
            );
        }
    }

    // sometimes upper case, like 'ADD', will not regard as a word by accessibility
    // here to convert accessibility label to lower case.
    private get accessibilityLabel() {
        if (this.props.accessibilityLabel) {
            return this.props.accessibilityLabel.toLocaleLowerCase();
        } else {
            return '';
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
