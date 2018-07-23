import * as React from 'react';
import {
    DatePickerAndroid,
    DatePickerIOS,
    Platform,
} from 'react-native';
import { TimeUtils } from '../../Utils/TimeUtils';
import { Column } from '../Containers/Column';
import { Row } from '../Containers/Row';
import { Button } from './Button';

interface IProps {
    vIndex: number;
    hIndex: number;
    value: string;
    onValueChange?: (input: string) => void;
    validateInput?: (input: string) => boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    style?: any;
}

interface IState {
    showDatePicker: boolean;
}

export class DateInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.showDatePickerAndroid = this.showDatePickerAndroid.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);

        this.state = {
            showDatePicker: false,
        };
    }

    public render() {
        return (
            <Column
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                width='stretch'
            >
                {this.renderBtn()}
                {this.renderInlineDatePicker()}
            </Column>
        );
    }

    private renderBtn = () => {
        return (
            <Row
                vIndex={0}
                hIndex={0}
            >
                <Button
                    vIndex={0}
                    hIndex={0}
                    title={this.props.value}
                    onPress={this.showDatePicker}
                    borderColor='#777777'
                    borderWidth={1}
                    borderRadius={4}
                />
            </Row >
        );
    }

    private renderInlineDatePicker = () => {
        if (Platform.OS === 'ios') {
            if (this.state.showDatePicker) {
                let date = TimeUtils.extractDate(this.props.value);
                return (
                    <Row
                        vIndex={0}
                        hIndex={0}
                    >
                        <DatePickerIOS
                            date={date}
                            mode='date'
                            onDateChange={this.onDateChange}
                            style={{ flex: 1 }}
                        />
                    </Row>
                );
            }
        }
        return undefined;
    }

    private async showDatePickerAndroid() {
        if (Platform.OS === 'android') {
            const today = new Date();
            try {
                const { action, year, month, day } = await DatePickerAndroid.open({
                    date: today,
                });
                if (action === DatePickerAndroid.dateSetAction) {
                    let newDate = new Date(year, month, day);
                    this.onDateChange(newDate);
                }
                if (action === DatePickerAndroid.dismissedAction) {
                    this.setState({
                        showDatePicker: false
                    }, this.onPickerClose);
                }
            } catch ({ code, message }) {
                console.warn('Cannot open date picker', message);
            }
        }
    }

    private async showDatePicker() {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
        if (this.state.showDatePicker) {
            this.setState({
                showDatePicker: false
            }, this.onPickerClose);
        } else {
            this.setState({
                showDatePicker: true
            });
            await this.showDatePickerAndroid();
        }
    }

    private onPickerClose = () => {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
        if (this.props.validateInput) {
            if (this.props.validateInput(this.props.value)) {
                console.log('DateInput: valid');
            } else {
                console.log('DateInput: invalid');
            }
        }
    }

    private onDateChange = (date: Date) => {
        if (this.props.onValueChange) {
            let timeString = TimeUtils.getDateString(date);
            this.props.onValueChange(timeString);
        }
    }
}
