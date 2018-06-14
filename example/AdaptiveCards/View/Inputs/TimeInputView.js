var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { DatePickerIOS, Platform, Text, TimePickerAndroid, TouchableOpacity, View } from 'react-native';
import { FormContext } from '../../Context/FormContext';
import { Utils } from '../../Shared/Utils';
export class TimeInputView extends React.PureComponent {
    constructor(props) {
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
    render() {
        const { element } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        return (React.createElement(View, null,
            React.createElement(TouchableOpacity, { onPress: this.showDatePicker },
                React.createElement(View, { style: {
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        marginVertical: 6,
                        height: 38
                    } },
                    React.createElement(Text, null, this.state.timeString))),
            this.showTimePickerIOS()));
    }
    showTimePickerIOS() {
        if (Platform.OS === 'ios') {
            if (this.state.showTimePicker) {
                let time = Utils.extractTime(this.state.timeString);
                console.log(time);
                return (React.createElement(DatePickerIOS, { date: time, mode: 'time', onDateChange: this.onTimeChangeIOS }));
            }
        }
        return undefined;
    }
    showTimePickerAndroid() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Platform.OS === 'android') {
                const now = new Date();
                try {
                    const { action, hour, minute } = yield TimePickerAndroid.open({
                        hour: now.getHours(),
                        minute: now.getMinutes(),
                        is24Hour: true
                    });
                    if (action === TimePickerAndroid.timeSetAction) {
                        this.onTimeChange(hour, minute);
                    }
                }
                catch ({ code, message }) {
                    console.warn('Cannot open date picker', message);
                }
            }
        });
    }
    showDatePicker() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.showTimePicker) {
                this.setState({
                    showTimePicker: false
                }, this.onPickerClose);
            }
            else {
                this.setState({
                    showTimePicker: true
                }, this.showTimePickerAndroid);
            }
        });
    }
    onPickerClose() {
        if (this.props.element.validateForm(this.state.timeString)) {
            console.log('TimeInput: valide');
        }
        else {
            console.log('TimeInput: invalide');
        }
    }
    onTimeChangeIOS(date) {
        this.onTimeChange(date.getHours(), date.getMinutes());
    }
    onTimeChange(hour, minute) {
        let timeString = Utils.composeTimeString(hour, minute);
        console.log(timeString);
        this.setState({
            timeString: timeString,
            showTimePicker: false,
        }, this.updateStore);
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.timeString, this.props.element.validateForm(this.state.timeString));
    }
}
