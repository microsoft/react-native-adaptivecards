var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { Text, TimePickerAndroid, TouchableOpacity, View } from 'react-native';
export class TimeInputView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.showDatePicker = () => __awaiter(this, void 0, void 0, function* () {
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
        });
        this.onTimeChange = (hour, minute) => {
            this.setState({
                time: hour.toString() + ' : ' + minute.toString()
            });
        };
        const { inputTime } = props;
        this.state = {
            time: inputTime.value,
            inputTime: inputTime
        };
    }
    render() {
        const { inputTime } = this.props;
        if (!inputTime || !inputTime.isValid()) {
            return null;
        }
        return (React.createElement(TouchableOpacity, { onPress: this.showDatePicker },
            React.createElement(View, { style: {
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    marginVertical: 6,
                    height: 38
                } },
                React.createElement(Text, null, this.state.time))));
    }
}
