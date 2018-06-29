var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { DatePickerIOS, Platform, Text, TimePickerAndroid, TouchableOpacity, View } from 'react-native';
import { Utils } from '../../Shared/Utils';
import { FlexBox } from '../Basic/FlexBox';
export class TimeInput extends React.Component {
    constructor(props) {
        super(props);
        this.renderBtn = () => {
            if (!this.state.showTimePicker) {
                return (React.createElement(TouchableOpacity, { style: { flex: 1 }, onPress: this.showDatePicker },
                    React.createElement(View, { style: [
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
                        ] },
                        React.createElement(Text, null, this.props.value))));
            }
            return undefined;
        };
        this.showTimePickerIOS = () => {
            if (Platform.OS === 'ios') {
                if (this.state.showTimePicker) {
                    let time = Utils.extractTime(this.props.value);
                    console.log(time);
                    return (React.createElement(DatePickerIOS, { date: time, mode: 'time', onDateChange: this.onTimeChangeIOS, style: { flex: 1 } }));
                }
            }
            return undefined;
        };
        this.onPickerClose = () => {
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
                let timeString = Utils.composeTimeString(hour, minute);
                console.log(timeString);
                this.setState({
                    showTimePicker: false,
                }, () => this.props.onValueChange(timeString));
            }
        };
        this.showTimePickerAndroid = this.showTimePickerAndroid.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.state = {
            showTimePicker: false,
        };
    }
    render() {
        return (React.createElement(FlexBox, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, relativeWidth: false, flexDirection: 'row', alignSelf: 'stretch', alignContent: 'flex-start', alignItems: 'stretch', justifyContent: 'space-between', width: 'stretch' },
            this.renderBtn(),
            this.showTimePickerIOS()));
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
}
