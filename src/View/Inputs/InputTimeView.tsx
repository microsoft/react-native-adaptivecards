import React from 'react';
import {
    TouchableOpacity,
    TimePickerAndroid,
    Text,
    View
} from 'react-native';

import { ICardElementViewProps } from '../view.d';
import InputTime from '../../Schema/Inputs/InputTime';

interface IProps extends ICardElementViewProps {
    inputTime: InputTime;
}
interface IState {
    time: string;
    inputTime?: InputTime;
}

export default class InputTexTimeView extends React.PureComponent<IProps, IState> {
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
                <View style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}>
                    <Text>
                        {this.state.time}
                    </Text>
                </View>
            </TouchableOpacity>);
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
