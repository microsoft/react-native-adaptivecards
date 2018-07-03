import * as React from 'react';
import {
    DatePickerAndroid,
    DatePickerIOS,
    Platform,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { TimeUtils } from '../../Shared/Utils';
import { FlexBox } from '../Basic/FlexBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    value: string;
    onValueChange?: (input: string) => void;
    validateInput?: (input: string) => boolean;
    style?: any;
}

interface IState {
    showDatePicker: boolean;
}

export class DateInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.showDatePickerAndroid = this.showDatePickerAndroid.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);

        this.state = {
            showDatePicker: false,
        };
    }

    public render() {
        return (
            <FlexBox
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                relativeWidth={false}
                flexDirection='row'
                alignSelf='stretch'
                alignContent='flex-start'
                alignItems='stretch'
                justifyContent='space-between'
                width='stretch'
            >
                {this.renderBtn()}
                {this.renderInlineDatePicker()}
            </FlexBox>
        );
    }

    private renderBtn = () => {
        if (!this.state.showDatePicker) {
            return (
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={this.showDatePicker}
                >
                    <View style={{
                        flex: 1,
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        marginVertical: 6,
                        height: 38,
                    }}>
                        <Text>
                            {this.props.value}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return undefined;
    }

    private renderInlineDatePicker = () => {
        if (Platform.OS === 'ios') {
            if (this.state.showDatePicker) {
                let date = TimeUtils.extractDate(this.props.value);
                console.log(date);
                return (
                    <DatePickerIOS
                        date={date}
                        mode='date'
                        onDateChange={this.onDateChange}
                        style={{ flex: 1 }}
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
                if (action === DatePickerAndroid.dismissedAction) {
                    this.setState({
                        showDatePicker: false
                    });
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

    private onPickerClose = () => {
        if (this.props.validateInput) {
            if (this.props.validateInput(this.props.value)) {
                console.log('DateInput: valid');
            } else {
                console.log('DateInput: invalid');
            }
        }
    }

    private onDateChange = (date: Date) => {
        this.setState({
            showDatePicker: false,
        }, () => {
            if (this.props.onValueChange) {
                let timeString = TimeUtils.getDateString(date);
                console.log(timeString);
                this.props.onValueChange(timeString);
            }
        });
    }
}
