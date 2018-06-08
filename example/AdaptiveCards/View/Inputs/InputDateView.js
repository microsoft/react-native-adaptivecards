var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { TouchableOpacity, DatePickerAndroid, Text, View } from 'react-native';
export default class InputTexDateView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.showDatePicker = () => __awaiter(this, void 0, void 0, function* () {
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
        });
        this.onDateChange = (dateTime) => {
            this.setState({
                date: dateTime.toString()
            });
        };
        const { inputDate } = props;
        this.state = {
            date: inputDate.value,
            inputDate: inputDate
        };
    }
    render() {
        const { inputDate } = this.props;
        if (!inputDate || !inputDate.isValid()) {
            return null;
        }
        return (
            React.createElement(
                TouchableOpacity,
                {
                    onPress: this.showDatePicker
                },
                React.createElement(
                    View,
                    {
                        style: {
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 4,
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            marginVertical: 6,
                            height: 38
                        }
                    },
                    React.createElement(Text, null, this.state.date)
                )
            )
        );
    }
}
