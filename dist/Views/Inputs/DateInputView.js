var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { DatePickerAndroid, DatePickerIOS, Platform, Text, TouchableOpacity, View } from 'react-native';
import { FormContext } from '../../Context/FormContext';
import { Utils } from '../../Shared/Utils';
export class DateInputView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onPickerClose = this.onPickerClose.bind(this);
        this.state = {
            dateString: this.props.element.value,
            showDatePicker: false,
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
                    React.createElement(Text, null, this.state.dateString))),
            this.renderInlineTimePicker()));
    }
    renderInlineTimePicker() {
        if (Platform.OS === 'ios') {
            if (this.state.showDatePicker) {
                let date = Utils.extractDate(this.state.dateString);
                console.log(date);
                return (React.createElement(DatePickerIOS, { date: date, mode: 'date', onDateChange: this.onDateChange }));
            }
        }
        return undefined;
    }
    showDatePickerAndroid() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Platform.OS === 'android') {
                const today = new Date();
                try {
                    const { action, year, month, day } = yield DatePickerAndroid.open({
                        date: today,
                    });
                    if (action === DatePickerAndroid.dateSetAction) {
                        let newDate = new Date(year, month, day);
                        this.onDateChange(newDate);
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
            if (this.state.showDatePicker) {
                this.setState({
                    showDatePicker: false
                }, this.onPickerClose);
            }
            else {
                this.setState({
                    showDatePicker: true
                });
                yield this.showDatePickerAndroid();
            }
        });
    }
    onPickerClose() {
        if (this.props.element.validateForm(this.state.dateString)) {
            console.log('DateInput: valide');
        }
        else {
            console.log('DateInput: invalide');
        }
    }
    onDateChange(date) {
        let timeString = Utils.getDateString(date);
        console.log(timeString);
        this.setState({
            dateString: timeString,
        }, this.updateStore);
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.dateString, this.props.element.validateForm(this.state.dateString));
    }
}
