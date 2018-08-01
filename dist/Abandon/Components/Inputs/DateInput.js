var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { DatePickerAndroid, DatePickerIOS, Platform, } from 'react-native';
import { TimeUtils } from '../../../Utils/TimeUtils';
import { Column } from '../Containers/Column';
import { Row } from '../Containers/Row';
import { Button } from './Button';
export class DateInput extends React.Component {
    constructor(props) {
        super(props);
        this.renderBtn = () => {
            return (React.createElement(Row, { vIndex: 0, hIndex: 0, width: 'stretch', height: 'auto' },
                React.createElement(Button, { vIndex: 0, hIndex: 0, title: this.props.value, onPress: this.showDatePicker, borderColor: '#777777', borderWidth: 1, borderRadius: 4 })));
        };
        this.renderInlineDatePicker = () => {
            if (Platform.OS === 'ios') {
                if (this.state.showDatePicker) {
                    let date = TimeUtils.extractDate(this.props.value);
                    return (React.createElement(Row, { vIndex: 0, hIndex: 0, width: 'stretch', height: 'auto' },
                        React.createElement(DatePickerIOS, { date: date, mode: 'date', onDateChange: this.onDateChange, style: { flex: 1 } })));
                }
            }
            return undefined;
        };
        this.onPickerClose = () => {
            if (this.props.onBlur) {
                this.props.onBlur();
            }
            if (this.props.validateInput) {
                if (this.props.validateInput(this.props.value)) {
                    console.log('DateInput: valid');
                }
                else {
                    console.log('DateInput: invalid');
                }
            }
        };
        this.onDateChange = (date) => {
            if (this.props.onValueChange) {
                let timeString = TimeUtils.getDateString(date);
                this.props.onValueChange(timeString);
            }
        };
        this.showDatePickerAndroid = this.showDatePickerAndroid.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.state = {
            showDatePicker: false,
        };
    }
    render() {
        return (React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', height: 'auto' },
            this.renderBtn(),
            this.renderInlineDatePicker()));
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
                    if (action === DatePickerAndroid.dismissedAction) {
                        this.setState({
                            showDatePicker: false
                        }, this.onPickerClose);
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
            if (this.props.onFocus) {
                this.props.onFocus();
            }
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
}
