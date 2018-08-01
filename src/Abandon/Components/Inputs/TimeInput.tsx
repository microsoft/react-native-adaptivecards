import * as React from 'react';
import {
    DatePickerIOS,
    Platform,
    TimePickerAndroid,
} from 'react-native';
import { TimeUtils } from '../../../Utils/TimeUtils';
import { Column } from '../Containers/Column';
import { Row } from '../Containers/Row';
import { Button } from './Button';

interface IProps {
    vIndex: number;
    hIndex: number;
    value: string;
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    onValueChange?: (input: string) => void;
    validateInput?: (input: string) => boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    style?: any;
}

interface IState {
    showTimePicker: boolean;
}

export class TimeInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.showTimePickerAndroid = this.showTimePickerAndroid.bind(this);
        this.showTimePicker = this.showTimePicker.bind(this);

        this.state = {
            showTimePicker: false,
        };
    }

    public render() {
        return (
            <Column
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                width='stretch'
                height='auto'
            >
                {this.renderBtn()}
                {this.renderInlineTimePickerIOS()}
            </Column>
        );
    }

    private renderBtn = () => {
        return (
            <Row
                vIndex={0}
                hIndex={0}
                width='stretch'
                height='auto'
            >
                <Button
                    vIndex={0}
                    hIndex={0}
                    title={this.props.value}
                    onPress={this.showTimePicker}
                    borderColor='#777777'
                    borderWidth={1}
                    borderRadius={4}
                />
            </Row>
        );
    }

    private renderInlineTimePickerIOS = () => {
        if (Platform.OS === 'ios') {
            if (this.state.showTimePicker) {
                let time = TimeUtils.extractTime(this.props.value);
                return (
                    <Row
                        vIndex={0}
                        hIndex={0}
                        width='stretch'
                        height='auto'
                    >
                        <DatePickerIOS
                            date={time}
                            mode='time'
                            onDateChange={this.onTimeChangeIOS}
                            style={{ flex: 1 }}
                        />
                    </Row>
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
                    }, this.onPickerClose);
                }
            } catch ({ code, message }) {
                console.warn('Cannot open date picker', message);
            }
        }
    }

    private async showTimePicker() {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
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
        if (this.props.onBlur) {
            this.props.onBlur();
        }
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
        if (this.props.onValueChange) {
            let timeString = TimeUtils.composeTimeString(hour, minute);
            this.props.onValueChange(timeString);
        }
    }
}
