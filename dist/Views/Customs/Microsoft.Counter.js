import * as React from 'react';
import { CountDown } from '../../Components/Basic/CountDown';
import { Timer } from '../../Components/Basic/Timer';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class CounterView extends React.Component {
    constructor(props) {
        super(props);
        this.start = () => {
            if (this.state && this.state.remains > 0) {
                setInterval(() => {
                    if (this.state.remains > 0) {
                        this.setState({
                            remains: this.state.remains - 1
                        });
                    }
                    else {
                        clearInterval();
                        if (this.props.model.callback) {
                            this.props.model.callback.onAction(() => {
                                console.log('Timer Callback Success');
                            }, () => {
                                console.log('Timer Callback Failed');
                            });
                        }
                    }
                }, 1000);
            }
        };
        const { model } = this.props;
        if (model.isSchemaCheckPassed) {
            this.state = {
                remains: model.value
            };
        }
    }
    componentDidMount() {
        this.mounted = true;
        const { model } = this.props;
        if (model.delay && model.delay > 0) {
            setTimeout(this.start, model.delay * 1000);
        }
        else {
            this.start();
        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    setState(state, callback) {
        if (this.mounted) {
            super.setState(state, callback);
        }
    }
    render() {
        const { model, theme } = this.props;
        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }
        if (model.format === 'CountDown') {
            return (React.createElement(CountDown, { remains: this.state.remains, theme: theme, marginTop: this.spacing }));
        }
        return (React.createElement(Timer, { remains: this.state.remains, theme: theme, marginTop: this.spacing }));
    }
    get spacing() {
        if (this.props.model.separator) {
            return 0;
        }
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
