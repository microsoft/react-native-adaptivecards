import React from 'react';
import {
    Text,
    TimePickerAndroid,
    TouchableOpacity,
    View
} from 'react-native';

import { InputContext } from '../../Context/InputContext';
import { TimeInputElement } from '../../Schema/Inputs/TimeInput';
import { ICardElementViewProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps<TimeInputElement> {
}
interface IState {
    time: string;
    inputTime?: TimeInputElement;
}

export class TimeInputView extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const { element } = props;

        this.state = {
            time: element.value,
            inputTime: element
        };
        this.updateStore();
    }

    render(): JSX.Element {
        const { element } = this.props;
        if (!element || !element.isValid()) {
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
        }, this.updateStore);
    }

    private updateStore() {
        InputContext.getInstance().updateField(
            this.props.element.id,
            this.state.time
        );
    }
}
