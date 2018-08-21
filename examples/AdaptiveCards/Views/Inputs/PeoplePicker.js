import * as React from 'react';
import { LabelInput } from '../../Components/Inputs/LabelInput';
import { ActionContext } from '../../Contexts/ActionContext';
import { FormContext } from '../../Contexts/FormContext';
import { ActionType } from '../../Schema/Abstract/ActionElement';
import { CardElement } from '../../Schema/Cards/Card';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class PeoplePickerView extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            this.setState({ inputFocused: false });
        };
        this.onFocus = () => {
            this.setState({ inputFocused: true });
        };
        this.onSuggestionCallback = (data) => {
            this.setState({
                suggestionCard: new CardElement(data, this.props.element),
            });
        };
        this.onRequestSuggestion = (input) => {
            this.setState({
                value: input,
            }, () => {
                const { element } = this.props;
                if (element.callback) {
                    let callback = ActionContext.getGlobalInstance().getActionEventHandler(element.callback, this.onSuggestionCallback);
                    if (callback) {
                        callback({
                            actionType: ActionType.Callback,
                            func: this.populateApiParams,
                            name: 'populateApiParams'
                        });
                    }
                }
            });
        };
        this.populateApiParams = (args) => {
            if (args && args.formValidate) {
                args.formData = this.extractParamData();
            }
            return args;
        };
        this.extractParamData = () => {
            const { element } = this.props;
            if (element.callback) {
                const params = element.callback.parameters;
                if (params) {
                    return Object.keys(params).reduce((prev, current) => {
                        let formIndex = params[current];
                        if (formIndex === element.id) {
                            prev[current] = this.state.value;
                        }
                        else {
                            prev[current] = FormContext.getInstance().getFieldValue(formIndex);
                        }
                        return prev;
                    }, {});
                }
            }
            return {};
        };
        this.storeListener = (value) => {
            this.setState({
                selected: JSON.parse(value),
                suggestionCard: undefined,
                inputFocused: true,
                value: '',
            });
        };
        const { element } = this.props;
        if (element && element.isValid) {
            this.state = {
                value: '',
                inputFocused: false,
                selected: [],
                suggestionCard: undefined,
            };
            FormContext.getInstance().updateField(element.id, JSON.stringify([]), true);
            FormContext.getInstance().registerFieldListener(element.id, this.storeListener);
        }
    }
    render() {
        const { element, theme } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }
        return (React.createElement(LabelInput, { placeholder: element.placeholder, value: this.state.value, focused: this.state.inputFocused, labels: this.labels, suggestionView: ContentFactory.createElement(this.state.suggestionCard, 0, theme), onRequestSuggestion: this.onRequestSuggestion, onFocus: this.onFocus, onBlur: this.onBlur }));
    }
    get labels() {
        return this.state.selected.map((contact) => {
            return {
                title: contact.Name
            };
        });
    }
}
