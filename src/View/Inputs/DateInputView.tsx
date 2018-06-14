import React from 'react';
import {
    DatePickerAndroid,
    DatePickerIOS,
    Platform,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { FormContext } from '../../Context/FormContext';
import { DateInputElement } from '../../Schema/Inputs/DateInput';
import { Utils } from '../../Shared/Utils';
import { ICardElementViewProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps<DateInputElement> {
}
interface IState {
    dateString: string;
    showDatePicker: boolean;
}

export class DateInputView extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
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

    render(): JSX.Element {
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
                            {this.state.dateString}
                        </Text>
                    </View>
                </TouchableOpacity>
                {this.renderInlineTimePicker()}
            </View>
        );
    }

    private renderInlineTimePicker() {
        if (Platform.OS === 'ios') {
            if (this.state.showDatePicker) {
                let date = Utils.extractDate(this.state.dateString);
                console.log(date);
                return (
                    <DatePickerIOS
                        date={date}
                        mode='date'
                        onDateChange={this.onDateChange}
                    />
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
            } catch ({ code, message }) {
                console.warn('Cannot open date picker', message);
            }
        }
    }

    private async showDatePicker() {
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

    private onPickerClose() {
        if (this.props.element.validateForm(this.state.dateString)) {
            console.log('DateInput: valide');
        } else {
            console.log('DateInput: invalide');
        }
    }

    private onDateChange(date: Date) {
        let timeString = Utils.getDateString(date);
        console.log(timeString);
        this.setState({
            dateString: timeString,
        }, this.updateStore);
    }

    private updateStore() {
        FormContext.getInstance().updateField(
            this.props.element.id,
            this.state.dateString,
            this.props.element.validateForm(this.state.dateString)
        );
    }
}
