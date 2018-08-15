import * as React from 'react';
import { NumberInput } from '../../Components/Inputs/NumberInput';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { StyleManager } from '../../Styles/StyleManager';
import { NumberUtils } from '../../Utils/NumberUtils';
export class NumberInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            console.log('NumberInputView onBlur');
            this.setState({
                focused: false,
            }, () => {
                let callback = HostContext.getInstance().getHandler('blur');
                if (callback) {
                    callback();
                }
            });
        };
        this.onFocus = () => {
            console.log('NumberInputView onFocus');
            this.setState({
                focused: true,
            }, () => {
                let callback = HostContext.getInstance().getHandler('focus');
                if (callback) {
                    callback();
                }
            });
        };
        this.onValueChange = (value) => {
            this.setState({
                value: value
            }, this.updateStore);
        };
        const { element } = this.props;
        if (element && element.isValid) {
            let defaultValue = this.props.element.value;
            if (defaultValue === undefined) {
                defaultValue = '';
            }
            if (NumberUtils.isNumber(this.props.element.value.toString())) {
                this.state = {
                    value: this.props.element.value.toString(),
                    focused: false,
                };
                this.updateStore();
            }
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(NumberInput, { color: StyleManager.getColor('default', this.theme, false), backgroundColor: StyleManager.getBackgroundColor(this.theme), borderColor: this.borderColor, borderRadius: 4, borderWidth: 1, fontSize: StyleManager.getFontSize('default'), fontWeight: StyleManager.getFontWeight('default'), placeholder: element.placeholder, value: this.state.value, onValueChange: this.onValueChange, onBlur: this.onBlur, onFocus: this.onFocus, validateInput: element.validate, marginTop: this.spacing, paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12 }));
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.props.element.validate(this.state.value));
    }
    get borderColor() {
        if (this.state.focused) {
            return StyleManager.getColor('accent', this.theme, false);
        }
        else {
            return StyleManager.getBackgroundColor(this.theme);
        }
    }
    get theme() {
        if (this.props.theme === 'emphasis') {
            return 'default';
        }
        else {
            return 'emphasis';
        }
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
