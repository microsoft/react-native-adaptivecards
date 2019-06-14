import * as React from 'react';
import { InputBox } from '../../Components/Inputs/InputBox';
import { NumberInputModel } from '../../Models/Inputs/NumberInput';
import { StyleManager } from '../../Styles/StyleManager';
import { NumberUtils } from '../../Utils/NumberUtils';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: NumberInputModel;
    theme: 'default' | 'emphasis';
}

interface IState {
    value: string;
}

export class NumberInputView extends React.Component<IProps, IState> {
    private mounted: boolean;

    constructor(props: IProps) {
        super(props);

        const { model } = this.props;

        if (model && model.isValueValid) {
            model.onStoreUpdate = this.onStoreUpdate;
            let defaultValue = model.value;
            if (defaultValue === undefined) {
                defaultValue = '';
            }

            if (NumberUtils.isNumber(model.value.toString())) {
                this.state = {
                    value: model.value.toString(),
                };
                this.props.model.onInput(this.state.value);
            }
        }
    }

    public componentDidMount() {
        this.mounted = true;
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    public setState(state: IState, callback?: () => void): void {
        if (this.mounted) {
            super.setState(state, callback);
        }
    }

    public render() {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }

        return (
            <InputBox
                placeholder={model.placeholder}
                value={this.state.value}
                onValueChange={this.onValueChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                theme={theme}
                marginTop={this.spacing}
            />
        );
    }

    private onBlur = () => {
        console.log('NumberInputView onBlur');
        const { model } = this.props;

        if (model) {
            let callback = model.context.blurHandler;
            if (callback) {
                callback();
            }
        }
    }

    private onFocus = () => {
        console.log('NumberInputView onFocus');

        const { model } = this.props;

        if (model) {
            let callback = model.context.focusHandler;
            if (callback) {
                callback();
            }
        }
    }

    private onValueChange = (value: string) => {
        this.setState({
            value: value
        }, () => {
            this.props.model.onInput(this.state.value);
        });
    }

    private onStoreUpdate = (value: string) => {
        if (value) {
            this.setState({
                value: value.toString()
            });
        }
    }

    private get spacing() {
        if (this.props.model.separator) {
            return 0;
        }

        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
