import * as React from 'react';
import { LabelInput } from '../../Components/Inputs/LabelInput';
import { ActionContext } from '../../Contexts/ActionContext';
import { FormContext } from '../../Contexts/FormContext';
import { ActionType } from '../../Schema/Abstract/ActionElement';
import { CardElement } from '../../Schema/Cards/Card';
import { PeoplePickerElement } from '../../Schema/Inputs/PeoplePicker';
import { CallbackAction } from '../../Schema/Internal/CallbackAction';
import { ActionEventHandlerArgs } from '../../Shared/Types';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    element: PeoplePickerElement;
    theme: 'default' | 'emphasis';
}

interface IState {
    value: string;
    selected: Array<{ Name: string, Address: string }>;
    inputFocused: boolean;
    suggestionCard: CardElement;
}

export class PeoplePickerView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

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

    public render() {
        const { element, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }

        return (
            <LabelInput
                placeholder={element.placeholder}
                value={this.state.value}
                focused={this.state.inputFocused}
                labels={this.labels}
                suggestionView={ContentFactory.createElement(this.state.suggestionCard, 0, theme)}
                onRequestSuggestion={this.onRequestSuggestion}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }

    private onBlur = () => {
        this.setState({ inputFocused: false });
    }

    private onFocus = () => {
        this.setState({ inputFocused: true });
    }

    private onSuggestionCallback = (data: any) => {
        this.setState({
            suggestionCard: new CardElement(data, this.props.element),
        });
    }

    private onRequestSuggestion = (input: string) => {
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
    }

    private populateApiParams = (args: ActionEventHandlerArgs<CallbackAction>) => {
        if (args && args.formValidate) {
            args.formData = this.extractParamData();
        }
        return args;
    }

    private extractParamData = () => {
        const { element } = this.props;

        if (element.callback) {
            const params = element.callback.parameters;
            if (params) {
                return Object.keys(params).reduce((prev, current) => {
                    let formIndex = params[current];
                    if (formIndex === element.id) {
                        prev[current] = this.state.value;
                    } else {
                        prev[current] = FormContext.getInstance().getFieldValue(formIndex);
                    }
                    return prev;
                }, {} as { [key: string]: string });
            }
        }
        return {};
    }

    private storeListener = (value: string) => {
        this.setState({
            selected: JSON.parse(value),
            suggestionCard: undefined,
            inputFocused: true,
            value: '',
        });
    }

    private get labels() {
        return this.state.selected.map((contact) => {
            return {
                title: contact.Name
            };
        });
    }
}
