import * as React from 'react';
import {
    DatePickerIOS,
    Platform,
    Text,
    TimePickerAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { TimeUtils } from '../../Utils/TimeUtils';
import { FlexBox } from '../Basic/FlexBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    value: string;
    onValueChange?: (input: string) => void;
    validateInput?: (input: string) => boolean;
    style?: any;
}

interface IState {
    showTimePicker: boolean;
}

export class TimeInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.showTimePickerAndroid = this.showTimePickerAndroid.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);

        this.state = {
            showTimePicker: false,
        };
    }

    public render() {
        return (
            <FlexBox
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                relativeWidth={false}
                flexDirection='row'
                alignSelf='stretch'
                alignContent='flex-start'
                alignItems='stretch'
                justifyContent='space-between'
                width='stretch'
            >
                {this.renderBtn()}
                {this.showTimePickerIOS()}
            </FlexBox>
        );
    }

    private renderBtn = () => {
        if (!this.state.showTimePicker) {
            return (
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={this.showDatePicker}
                >
                    <View
                        style={[
                            {
                                flex: 1,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 4,
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                marginVertical: 6,
                                height: 38,
                            }
                        ]}
                    >
                        <Text>
                            {this.props.value}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return undefined;
    }

    private showTimePickerIOS = () => {
        if (Platform.OS === 'ios') {
            if (this.state.showTimePicker) {
                let time = TimeUtils.extractTime(this.props.value);
                return (
                    <DatePickerIOS
                        date={time}
                        mode='time'
                        onDateChange={this.onTimeChangeIOS}
                        style={{ flex: 1 }}
                    />
                );
            }
        }
        return undefined;
    }

    private async showTimePickerAndroid() {
        if (Platform.OS === 'android') {
            const now = new Date();
            try {
                const { action, hour, minute } = await TimePickerAndroid.open({
                    hour: now.getHours(),
                    minute: now.getMinutes(),
                    is24Hour: true
                });
                if (action === TimePickerAndroid.timeSetAction) {
                    this.onTimeChange(hour, minute);
                }
                if (action === TimePickerAndroid.dismissedAction) {
                    this.setState({
                        showTimePicker: false
                    });
                }
            } catch ({ code, message }) {
                console.warn('Cannot open date picker', message);
            }
        }
    }

    private async showDatePicker() {
        if (this.state.showTimePicker) {
            this.setState({
                showTimePicker: false
            }, this.onPickerClose);
        } else {
            this.setState({
                showTimePicker: true
            }, this.showTimePickerAndroid);
        }
    }

    private onPickerClose = () => {
        if (this.props.validateInput) {
            if (this.props.validateInput(this.props.value)) {
                console.log('TimeInput: valid');
            } else {
                console.log('TimeInput: invalid');
            }
        }
    }

    private onTimeChangeIOS = (date: Date) => {
        this.onTimeChange(date.getHours(), date.getMinutes());
    }

    private onTimeChange = (hour: number, minute: number) => {
        this.setState({
            showTimePicker: false,
        }, () => {
            if (this.props.onValueChange) {
                let timeString = TimeUtils.composeTimeString(hour, minute);
                this.props.onValueChange(timeString);
            }
        });
    }
}
