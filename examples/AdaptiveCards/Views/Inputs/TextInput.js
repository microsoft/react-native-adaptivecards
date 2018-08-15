import * as React from 'react';
import { InputBox } from '../../Components/Inputs/InputBox';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { StyleManager } from '../../Styles/StyleManager';
export class TextInputView extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            console.log('TextInputView onBlur');
            this.setState({
                focused: false
            }, () => {
                let callback = HostContext.getInstance().getHandler('blur');
                if (callback) {
                    callback();
                }
            });
        };
        this.onFocus = () => {
            console.log('TextInputView onFocus');
            this.setState({
                focused: true
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
            this.state = {
                value: this.props.element.value,
                focused: false,
            };
            this.updateStore();
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(InputBox, { color: this.color, backgroundColor: this.backgroundColor, borderColor: this.borderColor, borderRadius: 4, borderWidth: 1, fontSize: StyleManager.getFontSize('default'), fontWeight: StyleManager.getFontWeight('default'), placeholder: element.placeholder, value: this.state.value, onValueChange: this.onValueChange, onFocus: this.onFocus, onBlur: this.onBlur, marginTop: this.spacing, paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12 }));
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.props.element.validate(this.state.value));
    }
    get color() {
        if (this.state.focused) {
            return StyleManager.getInputFocusColor(this.props.theme);
        }
        else {
            return StyleManager.getInputColor(this.props.theme);
        }
    }
    get backgroundColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBackgroundColor(this.props.theme);
        }
        else {
            return StyleManager.getInputBackgroundColor(this.props.theme);
        }
    }
    get borderColor() {
        if (this.state.focused) {
            return StyleManager.getInputFocusBorderColor(this.props.theme);
        }
        else {
            return StyleManager.getInputBorderColor(this.props.theme);
        }
    }
    get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
