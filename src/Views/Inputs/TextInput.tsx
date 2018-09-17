import * as React from 'react';
import { InputBox } from '../../Components/Inputs/InputBox';
import { TextInputModel } from '../../Models/Inputs/TextInput';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: TextInputModel;
    theme: 'default' | 'emphasis';
}

interface IState {
    value: string;
}

export class TextInputView extends React.Component<IProps, IState> {
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

            this.state = {
                value: defaultValue
            };
            this.props.model.onInput(this.state.value);
        }
    }

    public componentDidMount() {
        this.mounted = true;
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    // tslint:disable-next-line:max-line-length
    public setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void) {
        if (this.mounted) {

            super.setState(state as any, callback);
        }
    }

    public render() {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }

        return (
            <InputBox
                numberOfLines={this.numberOfLine}
                placeholder={model.placeholder}
                value={this.state.value}
                onValueChange={this.onValueChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                theme={theme}
                marginTop={this.spacing}
            />
        );
    }

    private onBlur = () => {
        console.log('TextInputView onBlur');
        const { model } = this.props;

        if (model) {
            let callback = model.context.blurHandler;
            if (callback) {
                callback();
            }
        }
    }

    private onFocus = () => {
        console.log('TextInputView onFocus');
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
        this.setState({
            value: value
        });
    }

    private get numberOfLine() {
        if (this.props.model.isMultiline) {
            return 4;
        }
        return 1;
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
