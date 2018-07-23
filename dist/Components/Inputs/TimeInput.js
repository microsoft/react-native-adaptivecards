var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { DatePickerIOS, Platform, TimePickerAndroid, } from 'react-native';
import { TimeUtils } from '../../Utils/TimeUtils';
import { Column } from '../Containers/Column';
import { Row } from '../Containers/Row';
import { Button } from './Button';
export class TimeInput extends React.Component {
    constructor(props) {
        super(props);
        this.renderBtn = () => {
            return (React.createElement(Row, { vIndex: 0, hIndex: 0 },
                React.createElement(Button, { vIndex: 0, hIndex: 0, title: this.props.value, onPress: this.showTimePicker, borderColor: '#777777', borderWidth: 1, borderRadius: 4 })));
        };
        this.renderInlineTimePickerIOS = () => {
            if (Platform.OS === 'ios') {
                if (this.state.showTimePicker) {
                    let time = TimeUtils.extractTime(this.props.value);
                    return (React.createElement(Row, { vIndex: 0, hIndex: 0 },
                        React.createElement(DatePickerIOS, { date: time, mode: 'time', onDateChange: this.onTimeChangeIOS, style: { flex: 1 } })));
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
                    console.log('TimeInput: valid');
                }
                else {
                    console.log('TimeInput: invalid');
                }
            }
        };
        this.onTimeChangeIOS = (date) => {
            this.onTimeChange(date.getHours(), date.getMinutes());
        };
        this.onTimeChange = (hour, minute) => {
            if (this.props.onValueChange) {
                let timeString = TimeUtils.composeTimeString(hour, minute);
                this.props.onValueChange(timeString);
            }
        };
        this.showTimePickerAndroid = this.showTimePickerAndroid.bind(this);
        this.showTimePicker = this.showTimePicker.bind(this);
        this.state = {
            showTimePicker: false,
        };
    }
    render() {
        return (React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch' },
            this.renderBtn(),
            this.renderInlineTimePickerIOS()));
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
                    if (action === TimePickerAndroid.dismissedAction) {
                        this.setState({
                            showTimePicker: false
                        }, this.onPickerClose);
                    }
                }
                catch ({ code, message }) {
                    console.warn('Cannot open date picker', message);
                }
            }
        });
    }
    showTimePicker() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.props.onFocus) {
                this.props.onFocus();
            }
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
}
