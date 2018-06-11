import React from 'react';
import {
    DatePickerAndroid,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { DateInputElement } from '../../Schema/Inputs/DateInput';
import { ICardElementViewProps, IInputFieldProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps, IInputFieldProps {
    inputDate: DateInputElement;
}
interface IState {
    date: string;
    inputDate?: DateInputElement;
}

export class DateInputView extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const { inputDate } = props;

        this.state = {
            date: inputDate.value,
            inputDate: inputDate
        };
    }

    render(): JSX.Element {
        const { inputDate } = this.props;
        if (!inputDate || !inputDate.isValid()) {
            return null;
        }

        return (
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
                        {this.state.date}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    private showDatePicker = async () => {
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

    private onDateChange = (dateTime: Date) => {
        this.setState({
            date: dateTime.toString()
        });
    }
}
