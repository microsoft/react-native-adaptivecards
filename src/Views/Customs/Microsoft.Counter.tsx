import * as React from 'react';

import { CountDown } from '../../Components/Basic/CountDown';
import { Timer } from '../../Components/Basic/Timer';
import { CounterModel } from '../../Models/Customs/Microsoft.Counter';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: CounterModel;
    theme: 'default' | 'emphasis';
}

interface IState {
    remains: number;
}

export class CounterView extends React.Component<IProps, IState> {
    private mounted: boolean;

    constructor(props: IProps) {
        super(props);

        const { model } = this.props;

        if (model.isSchemaCheckPassed) {
            this.state = {
                remains: model.value
            };
        }
    }

    public componentDidMount() {
        this.mounted = true;

        const { model } = this.props;

        if (model.delay && model.delay > 0) {
            setTimeout(this.start, model.delay * 1000);
        } else {
            this.start();
        }
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    // tslint:disable-next-line:max-line-length
    public setState<IState>(state: IState, callback?: () => void) {
        if (this.mounted) {
            super.setState(state, callback);
        }
    }

    public render() {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }

        if (model.format === 'CountDown') {
            return (
                <CountDown
                    remains={this.state.remains}
                    theme={theme}
                    marginTop={this.spacing}
                />
            );
        }

        return (
            <Timer
                remains={this.state.remains}
                theme={theme}
                marginTop={this.spacing}
            />
        );
    }

    private start = () => {
        if (this.state && this.state.remains > 0) {
            setInterval(() => {
                if (this.state.remains > 0) {
                    this.setState({
                        remains: this.state.remains - 1
                    });
                } else {
                    clearInterval();
                    if (this.props.model.callback) {
                        this.props.model.callback.onAction(
                            () => {
                                console.log('Timer Callback Success');
                            },
                            () => {
                                console.log('Timer Callback Failed');
                            }
                        );
                    }
                }
            }, 1000);
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
