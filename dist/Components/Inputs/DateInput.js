var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { DatePickerAndroid, DatePickerIOS, Platform, Text, TouchableOpacity, View } from 'react-native';
import { TimeUtils } from '../../Shared/Utils';
import { FlexBox } from '../Basic/FlexBox';
export class DateInput extends React.Component {
    constructor(props) {
        super(props);
        this.renderBtn = () => {
            if (!this.state.showDatePicker) {
                return (React.createElement(TouchableOpacity, { style: { flex: 1 }, onPress: this.showDatePicker },
                    React.createElement(View, { style: {
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 4,
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            marginVertical: 6,
                            height: 38,
                        } },
                        React.createElement(Text, null, this.props.value))));
            }
            return undefined;
        };
        this.renderInlineDatePicker = () => {
            if (Platform.OS === 'ios') {
                if (this.state.showDatePicker) {
                    let date = TimeUtils.extractDate(this.props.value);
                    console.log(date);
                    return (React.createElement(DatePickerIOS, { date: date, mode: 'date', onDateChange: this.onDateChange, style: { flex: 1 } }));
                }
            }
            return undefined;
        };
        this.onPickerClose = () => {
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
                console.log(timeString);
                this.setState({
                    showDatePicker: false,
                }, () => this.props.onValueChange(timeString));
            }
        };
        this.showDatePickerAndroid = this.showDatePickerAndroid.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.state = {
            showDatePicker: false,
        };
    }
    render() {
        return (React.createElement(FlexBox, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, relativeWidth: false, flexDirection: 'row', alignSelf: 'stretch', alignContent: 'flex-start', alignItems: 'stretch', justifyContent: 'space-between', width: 'stretch' },
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
}
