import * as React from 'react';

import { Toggle } from '../../Components/Inputs/Toggle';
import { ToggleInputModel } from '../../Models/Inputs/ToggleInput';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: ToggleInputModel;
    theme: 'default' | 'emphasis';
}

interface IState {
    checked: boolean;
}

export class ToggleInputView extends React.Component<IProps, IState> {
    private mounted: boolean;

    constructor(props: IProps) {
        super(props);

        const { model } = this.props;

        if (model && model.isSchemaCheckPassed) {
            this.state = {
                checked: model.value === model.valueOn,
            };
            model.onStoreUpdate = this.onStoreUpdate;
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
            <Toggle
                title={model.title}
                value={model.value}
                checked={this.state.checked}
                theme={theme}
                marginTop={this.spacing}
                onClick={this.onClick}
            />
        );
    }

    private onClick = (value: string) => {
        const { model } = this.props;

        if (model && model.isSchemaCheckPassed) {
            if (this.state.checked) {
                model.onInput(model.valueOff);
            } else {
                model.onInput(model.valueOn);
            }
        }
    }

    private onStoreUpdate = (value: string) => {
        this.setState({
            checked: value === this.props.model.valueOn
        });
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
