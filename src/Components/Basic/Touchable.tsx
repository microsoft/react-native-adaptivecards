import * as React from 'react';
import {
    AccessibilityTraits,
    DeviceEventEmitter,
    LayoutChangeEvent,
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from 'react-native';
import { ConfigManager } from '../../Config/ConfigManager';
import { Guid } from '../../Shared/Guid';

interface IProps {
    testId?: string;
    disabled?: boolean;
    style?: object;
    accessibilityLabel?: string;
    accessibilityTraits?: AccessibilityTraits | AccessibilityTraits[];
    accessibilityComponentType?: 'none' | 'button' | 'radiobutton_checked' | 'radiobutton_unchecked';
    hitSlop?: object;
    activeOpacity?: number;
    oneTime?: boolean;
    onPress: (data: any) => void;
    onLongPress?: (data: any) => void;
    onLayout?: (event: LayoutChangeEvent) => void;
}

interface IState {
    disabled: boolean;
}

export class Touchable extends React.Component<IProps, IState> {
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

    public componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevState.disabled !== this.props.disabled) {
            this.setState({
                disabled: this.props.disabled
            });
        }
    }

    public render() {
        const {
            onLongPress,
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
                    disabled={this.state.disabled}
                    onPress={this.onPress}
                    onLongPress={onLongPress}
                    accessible={true}
                    testID={this.testId}
                    useForeground={true}
                    hitSlop={hitSlop}
                    background={TouchableNativeFeedback.SelectableBackground()}
                    accessibilityLabel={accessibilityLabel}
                    accessibilityComponentType={accessibilityComponentType}
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
                    disabled={this.state.disabled}
                    onPress={this.onPress}
                    onLongPress={onLongPress}
                    accessible={true}
                    testID={this.testId}
                    activeOpacity={activeOpacity}
                    style={style}
                    hitSlop={hitSlop}
                    accessibilityLabel={accessibilityLabel}
                    accessibilityTraits={accessibilityTraits}
                    onLayout={this.props.onLayout}
                >
                    {otherProps.children}
                </TouchableOpacity>
            );
        }
    }

    private onPress = (data: any) => {
        if (!this.state.disabled) {
            if (this.props.oneTime && ConfigManager.getInstance().getConfig().mode !== 'debug') {
                this.setState({
                    disabled: true,
                });
            }

            if (this.props.onPress) {
                this.props.onPress(data);
            }
        }
    }
}
