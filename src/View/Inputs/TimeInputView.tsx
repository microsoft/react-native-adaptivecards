import React from 'react';
import {
    Text,
    TimePickerAndroid,
    TouchableOpacity,
    View
} from 'react-native';

import { TimeInputElement } from '../../Schema/Inputs/TimeInput';
import { ICardElementViewProps, IInputFieldProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps, IInputFieldProps {
    inputTime: TimeInputElement;
}
interface IState {
    time: string;
    inputTime?: TimeInputElement;
}

export class TimeInputView extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const { inputTime } = props;

        this.state = {
            time: inputTime.value,
            inputTime: inputTime
        };
    }

    render(): JSX.Element {
        const { inputTime } = this.props;
        if (!inputTime || !inputTime.isValid()) {
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
                        {this.state.time}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    private showDatePicker = async () => {
        const now = new Date();

        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: now.getHours(),
                minute: now.getMinutes(),
                is24Hour: true
            });
            if (action === TimePickerAndroid.timeSetAction) {
                this.onTimeChange(hour, minute);
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    private onTimeChange = (hour: number, minute: number) => {
        this.setState({
            time: hour.toString() + ' : ' + minute.toString()
        });
    }
}
