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
    private startTime: number;
    private endTime: number;

    constructor(props: IProps) {
        super(props);

        const { model } = this.props;

        if (model && model.isSchemaCheckPassed) {
            this.startTime = Date.now();
            if (model.delay && model.delay > 0) {
                this.startTime = this.startTime + model.delay * 1000;
            }
            this.endTime = this.startTime;
            if (model.value && model.value > 0) {
                this.endTime = this.startTime + model.value * 1000;
            }
            this.state = {
                remains: model.value
            };
        }
    }

    public componentDidMount() {
        this.mounted = true;

        this.countDown();
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

    private countDown = () => {
        let now = Date.now();
        console.log(this.startTime, this.endTime, now);
        if (this.startTime < now) {
            let remains = Math.floor((this.endTime - now) / 1000);
            if (remains >= 0) {
                this.setState({
                    remains: remains,
                });
            }
        }
        if (this.endTime > now) {
            setTimeout(this.countDown, 1000);
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
