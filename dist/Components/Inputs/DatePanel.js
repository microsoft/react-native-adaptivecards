import * as React from 'react';
import { DatePickerAndroid, DatePickerIOS, Platform } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { TimeUtils } from '../../Utils/Time';
import { ButtonGroup } from '../Containers/ButtonGroup';
import { Card } from '../Containers/Card';
import { ModalBox } from '../Containers/ModalBox';
import { Button } from './Button';
export class DatePanel extends React.Component {
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
        this.onDateChange = (date) => {
            if (this.props.onValueChange) {
                this.props.onValueChange(TimeUtils.getDateString(date));
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
            return (React.createElement(ModalBox, { show: this.show, onBackgroundPress: this.onCancel, onRequestClose: this.onSave },
                React.createElement(Card, { flex: 0, fit: 'content', config: this.props.config },
                    React.createElement(DatePickerIOS, { date: TimeUtils.extractDate(this.props.value), mode: 'date', onDateChange: this.onDateChange }),
                    React.createElement(ButtonGroup, { hasSpacing: true, config: this.props.config },
                        this.renderCancelButton(),
                        this.renderSaveButton()))));
        }
        return null;
    }
    renderCancelButton() {
        return (React.createElement(Button, { flex: 1, title: 'Cancel', color: StyleManager.getColor('accent', 'default', false, this.props.config), fontSize: StyleManager.getFontSize('default', this.props.config), fontWeight: StyleManager.getFontWeight('bolder', this.props.config), backgroundColor: StyleManager.getBackgroundColor('default', this.props.config), textHorizontalAlign: 'center', textVerticalAlign: 'center', paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, onPress: this.onCancel }));
    }
    renderSaveButton() {
        return (React.createElement(Button, { flex: 1, title: 'Save', color: StyleManager.getColor('accent', 'default', false, this.props.config), fontSize: StyleManager.getFontSize('default', this.props.config), fontWeight: StyleManager.getFontWeight('bolder', this.props.config), backgroundColor: StyleManager.getBackgroundColor('default', this.props.config), textHorizontalAlign: 'center', textVerticalAlign: 'center', paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16, onPress: this.onSave, style: {
                borderLeftWidth: 1,
                borderLeftColor: StyleManager.getSeparatorColor(this.props.config),
            } }));
    }
    async showPickerAndroid() {
        if (Platform.OS === 'android') {
            const today = TimeUtils.extractDate(this.props.value);
            try {
                const result = await DatePickerAndroid.open({
                    date: today,
                });
                if (result.action === DatePickerAndroid.dateSetAction) {
                    let newDate = new Date(result.year, result.month, result.day);
                    this.onDateChange(newDate);
                    this.onSave();
                }
                if (result.action === DatePickerAndroid.dismissedAction) {
                    this.setState({
                        showDatePicker: false
                    }, this.onCancel);
                }
            }
            catch ({ code, message }) {
                console.warn('Cannot open date picker', message);
            }
        }
    }
    get show() {
        return this.props.show && Platform.OS === 'ios';
    }
}
