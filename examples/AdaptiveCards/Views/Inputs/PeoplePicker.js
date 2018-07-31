import * as React from 'react';
import { TextBlock } from '../../Components/Basic/TextBlock';
import { Column } from '../../Components/Containers/Column';
import { ModalBox } from '../../Components/Containers/ModalBox';
import { Row } from '../../Components/Containers/Row';
import { Button } from '../../Components/Inputs/Button';
import { InputBox } from '../../Components/Inputs/InputBox';
import { LinkButton } from '../../Components/Inputs/LinkButton';
import { ActionContext } from '../../Contexts/ActionContext';
import { FormContext } from '../../Contexts/FormContext';
import { HostContext } from '../../Contexts/HostContext';
import { ContentElementFactory } from '../../Schema/Factories/ContentElementFactory';
import { ContentFactory } from '../Factories/ContentFactory';
export class PeoplePickerView extends React.Component {
    constructor(props) {
        super(props);
        this.closeModal = () => {
            console.log('Show Modal');
            this.onBlur();
            this.setState({
                showModal: false,
            });
        };
        this.showModal = () => {
            console.log('Show Modal');
            this.onFocus();
            this.setState({
                showModal: true,
            });
        };
        this.onValueChange = (value) => {
            this.setState({
                value: value
            }, () => this.showAutoSuggestion(value));
        };
        this.onBlur = () => {
            console.log('PeoplePickerView onBlur');
            let callback = HostContext.getInstance().getHandler('blur');
            if (callback) {
                callback();
            }
        };
        this.onFocus = () => {
            console.log('PeoplePickerView onBlur');
            let callback = HostContext.getInstance().getHandler('focus');
            if (callback) {
                callback();
            }
        };
        this.showAutoSuggestion = (input) => {
            const { element } = this.props;
            FormContext.getInstance().updateField('contact_name', this.state.value, this.props.element.validate(this.state.value));
            if (element && element.isValid) {
                let callback = ActionContext.getGlobalInstance().getActionEventHandler(element.action, this.onSuggestionReceived, this.onSuggestionError);
                if (callback) {
                    callback();
                }
            }
        };
        this.onSuggestionReceived = (json) => {
            if (json) {
                this.setState({
                    autoSuggestion: ContentElementFactory.create(json, this.props.element)
                });
            }
        };
        this.onSuggestionError = (error) => {
            console.log(error);
        };
        const { element } = this.props;
        if (element && element.isValid) {
            this.state = {
                value: element.value,
                showModal: false,
                autoSuggestion: undefined,
            };
            this.updateStore();
        }
    }
    render() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(Row, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, spacing: 0, width: 'stretch', height: 'auto' },
            React.createElement(Button, { vIndex: 0, hIndex: 0, vSpacing: 0, hSpacing: 0, title: this.state.value || element.placeholder, onPress: this.showModal, color: '#333333', backgroundColor: 'white', borderColor: '#777777', borderRadius: 4, borderWidth: 1, textAlign: 'left' }),
            this.renderModal()));
    }
    renderModal() {
        return (React.createElement(ModalBox, { show: this.state.showModal },
            React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, vSPacing: 0, width: 'stretch', height: 'stretch' },
                this.renderModalHeader(),
                this.renderInputBox(),
                this.renderAutoSuggestion())));
    }
    renderModalHeader() {
        return (React.createElement(Row, { vIndex: 0, hIndex: 0, spacing: 0, width: 'stretch', height: 'auto' },
            React.createElement(LinkButton, { vIndex: 0, hIndex: 0, title: 'CANCEL', textAlign: 'left', wrap: 'wrap', numberOfLines: 1, onPress: this.closeModal }),
            React.createElement(TextBlock, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', fontSize: 16, fontWeight: 'bold', color: '#333333', backgroundColor: 'transparent', textAlign: 'center', wrap: 'wrap', vSpacing: 0, numberOfLines: 1 }, 'People Picker'),
            React.createElement(LinkButton, { vIndex: 0, hIndex: 0, title: 'SAVE', textAlign: 'right', wrap: 'wrap', numberOfLines: 1, onPress: this.closeModal })));
    }
    renderInputBox() {
        const { element } = this.props;
        if (!element || !element.isValid) {
            return null;
        }
        return (React.createElement(Row, { vIndex: 0, hIndex: 0, spacing: 0, width: 'stretch', height: 'auto' },
            React.createElement(InputBox, { vIndex: 0, hIndex: 0, placeholder: element.placeholder, value: this.state.value, onValueChange: this.onValueChange, onBlur: this.onBlur })));
    }
    renderAutoSuggestion() {
        if (this.state.autoSuggestion) {
            return (React.createElement(Row, { vIndex: 1, hIndex: 0, spacing: 0, width: 'stretch', height: 'auto' }, ContentFactory.createView(this.state.autoSuggestion, 0, this.props.theme)));
        }
        return undefined;
    }
    updateStore() {
        FormContext.getInstance().updateField(this.props.element.id, this.state.value, this.props.element.validate(this.state.value));
    }
}
