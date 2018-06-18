import React from 'react';
import {
    DatePickerIOS,
    Platform,
    Text,
    TimePickerAndroid,
    TouchableOpacity,
    View
} from 'react-native';

import { FormContext } from '../../Context/FormContext';
import { TimeInputElement } from '../../Schema/Inputs/TimeInput';
import { Utils } from '../../Shared/Utils';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<TimeInputElement> {
}
interface IState {
    timeString: string;
    showTimePicker: boolean;
}

export class TimeInputView extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.showDatePicker = this.showDatePicker.bind(this);
        this.onTimeChangeIOS = this.onTimeChangeIOS.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onPickerClose = this.onPickerClose.bind(this);

        this.state = {
            timeString: this.props.element.value,
            showTimePicker: false,
        };
        this.updateStore();
    }

    public render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <View>
                <TouchableOpacity
                    onPress={this.showDatePicker}>
                    <View style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        marginVertical: 6,
                        height: 38
                    }}>
                        <Text>
                            {this.state.timeString}
                        </Text>
                    </View>
                </TouchableOpacity>
                {this.showTimePickerIOS()}
            </View>
        );
    }

    private showTimePickerIOS() {
        if (Platform.OS === 'ios') {
            if (this.state.showTimePicker) {
                let time = Utils.extractTime(this.state.timeString);
                console.log(time);
                return (
                    <DatePickerIOS
                        date={time}
                        mode='time'
                        onDateChange={this.onTimeChangeIOS}
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

    private onPickerClose() {
        if (this.props.element.validateForm(this.state.timeString)) {
            console.log('TimeInput: valide');
        } else {
            console.log('TimeInput: invalide');
        }
    }

    private onTimeChangeIOS(date: Date) {
        this.onTimeChange(date.getHours(), date.getMinutes());
    }

    private onTimeChange(hour: number, minute: number) {
        let timeString = Utils.composeTimeString(hour, minute);
        console.log(timeString);
        this.setState({
            timeString: timeString,
            showTimePicker: false,
        }, this.updateStore);
    }

    private updateStore() {
        FormContext.getInstance().updateField(
            this.props.element.id,
            this.state.timeString,
            this.props.element.validateForm(this.state.timeString)
        );
    }
}
