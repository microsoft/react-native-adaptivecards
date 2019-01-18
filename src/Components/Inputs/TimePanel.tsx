import * as React from 'react';
import { DatePickerIOS, Platform, TimePickerAndroid } from 'react-native';

import { HostConfig } from '../../Configs/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { TimeUtils } from '../../Utils/Time';
import { ButtonGroup } from '../Containers/ButtonGroup';
import { Card } from '../Containers/Card';
import { ModalBox } from '../Containers/ModalBox';
import { Button } from './Button';

interface IProps {
    value: string;
    show: boolean;
    config: HostConfig;
    onValueChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export class TimePanel extends React.Component<IProps> {
    public componentDidUpdate(prevProps: IProps) {
        if (Platform.OS === 'android' && this.props.show && !prevProps.show) {
            this.showPickerAndroid();
        }
    }

    public render() {
        if (Platform.OS === 'ios') {
            return (
                <ModalBox
                    show={this.show}
                    onBackgroundPress={this.onCancel}
                    onRequestClose={this.onSave}
                >
                    <Card
                        flex={0}
                        fit='content'
                        config={this.props.config}
                    >
                        <DatePickerIOS
                            date={TimeUtils.extractTime(this.props.value)}
                            mode='time'
                            onDateChange={this.onTimeChangeIos}
                        />
                        <ButtonGroup
                            hasSpacing={true}
                            config={this.props.config}
                        >
                            {this.renderCancelButton()}
                            {this.renderSaveButton()}
                        </ButtonGroup>
                    </Card>
                </ModalBox>
            );
        }
        return null;
    }

    private renderCancelButton() {
        return (
            <Button
                flex={1}
                title='Cancel'
                color={StyleManager.getColor('accent', 'default', false, this.props.config)}
                fontSize={StyleManager.getFontSize('default', this.props.config)}
                fontWeight={StyleManager.getFontWeight('bolder', this.props.config)}
                backgroundColor={StyleManager.getBackgroundColor('default', this.props.config)}
                textHorizontalAlign='center'
                textVerticalAlign='center'
                paddingTop={6}
                paddingBottom={6}
                paddingLeft={16}
                paddingRight={16}
                onPress={this.onCancel}
            />
        );
    }

    private renderSaveButton() {
        return (
            <Button
                flex={1}
                title='Save'
                color={StyleManager.getColor('accent', 'default', false, this.props.config)}
                fontSize={StyleManager.getFontSize('default', this.props.config)}
                fontWeight={StyleManager.getFontWeight('bolder', this.props.config)}
                backgroundColor={StyleManager.getBackgroundColor('default', this.props.config)}
                textHorizontalAlign='center'
                textVerticalAlign='center'
                paddingTop={6}
                paddingBottom={6}
                paddingLeft={16}
                paddingRight={16}
                onPress={this.onSave}
                style={{
                    borderLeftWidth: 1,
                    borderLeftColor: StyleManager.getSeparatorColor(this.props.config),
                }}
            />
        );
    }

    private async showPickerAndroid() {
        if (Platform.OS === 'android') {
            const now = TimeUtils.extractTime(this.props.value);
            try {
                const result = await TimePickerAndroid.open({
                    hour: now.getHours(),
                    minute: now.getMinutes(),
                    is24Hour: true
                });
                if (result.action === TimePickerAndroid.timeSetAction) {
                    this.onTimeChange(result.hour, result.minute);
                    this.onSave();
                }
                if (result.action === TimePickerAndroid.dismissedAction) {
                    this.setState({
                        showTimePicker: false
                    }, this.onCancel);
                }
            } catch ({ code, message }) {
                console.warn('Cannot open time picker', message);
            }
        }
    }

    private onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    private onSave = () => {
        if (this.props.onSave) {
            this.props.onSave();
        }
    }

    private onTimeChangeIos = (date: Date) => {
        if (this.props.onValueChange) {
            this.props.onValueChange(TimeUtils.getTimeString(date));
        }
    }

    private onTimeChange = (hour: number, minute: number) => {
        if (this.props.onValueChange) {
            this.props.onValueChange(TimeUtils.composeTimeString(hour, minute));
        }
    }

    private get show() {
        return this.props.show && Platform.OS === 'ios';
    }
}
