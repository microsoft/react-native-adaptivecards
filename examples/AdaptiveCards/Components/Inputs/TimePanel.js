import * as React from 'react';
import { DatePickerIOS, Platform, TimePickerAndroid } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { AccessibilityUtils } from '../../Utils/AccessibilityUtils';
import { TimeUtils } from '../../Utils/TimeUtils';
import { ButtonGroup } from '../Containers/ButtonGroup';
import { Card } from '../Containers/Card';
import { ModalBox } from '../Containers/ModalBox';
import { Button } from './Button';
export class TimePanel extends React.Component {
    constructor() {
        super(...arguments);
        this.onCancel = () => {
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        };
        this.onSave = () => {
            if (this.props.onSave) {
                this.props.onSave();
            }
        };
        this.onShow = () => {
            if (this.panel) {
                AccessibilityUtils.focusComponent(this.panel);
            }
        };
        this.onTimeChangeIos = (date) => {
            if (this.props.onValueChange) {
                this.props.onValueChange(TimeUtils.getTimeString(date));
            }
        };
        this.onTimeChange = (hour, minute) => {
            if (this.props.onValueChange) {
                this.props.onValueChange(TimeUtils.composeTimeString(hour, minute));
            }
        };
    }
    componentDidUpdate(prevProps) {
        if (Platform.OS === 'android' && this.props.show && !prevProps.show) {
            this.showPickerAndroid();
        }
    }
    render() {
        if (Platform.OS === 'ios') {
            return (React.createElement(ModalBox, { show: this.show, onShow: this.onShow },
                React.createElement(Card, { flex: 0, fit: 'content', ref: ref => this.panel = ref },
                    React.createElement(DatePickerIOS, { date: TimeUtils.extractTime(this.props.value), mode: 'time', onDateChange: this.onTimeChangeIos }),
                    React.createElement(ButtonGroup, { hasSpacing: true },
                        this.renderCancelButton(),
                        this.renderSaveButton()))));
        }
        return null;
    }
    renderCancelButton() {
        return (React.createElement(Button, { flex: 1, title: 'Cancel', color: StyleManager.getColor('accent', 'default', false), fontSize: StyleManager.getFontSize('default'), fontWeight: StyleManager.getFontWeight('bolder'), backgroundColor: StyleManager.getBackgroundColor('default'), textHorizontalAlign: 'center', textVerticalAlign: 'center', paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, onPress: this.onCancel }));
    }
    renderSaveButton() {
        return (React.createElement(Button, { flex: 1, title: 'Save', color: StyleManager.getColor('accent', 'default', false), fontSize: StyleManager.getFontSize('default'), fontWeight: StyleManager.getFontWeight('bolder'), backgroundColor: StyleManager.getBackgroundColor('default'), textHorizontalAlign: 'center', textVerticalAlign: 'center', paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, onPress: this.onSave, style: {
                borderLeftWidth: 1,
                borderLeftColor: StyleManager.separatorColor,
            } }));
    }
    async showPickerAndroid() {
        if (Platform.OS === 'android') {
            const now = TimeUtils.extractTime(this.props.value);
            try {
                const { action, hour, minute } = await TimePickerAndroid.open({
                    hour: now.getHours(),
                    minute: now.getMinutes(),
                    is24Hour: true
                });
                if (action === TimePickerAndroid.timeSetAction) {
                    this.onTimeChange(hour, minute);
                    this.onSave();
                }
                if (action === TimePickerAndroid.dismissedAction) {
                    this.setState({
                        showTimePicker: false
                    }, this.onCancel);
                }
            }
            catch ({ code, message }) {
                console.warn('Cannot open time picker', message);
            }
        }
    }
    get show() {
        return this.props.show && Platform.OS === 'ios';
    }
}
