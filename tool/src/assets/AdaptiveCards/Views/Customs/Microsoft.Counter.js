import * as React from 'react';
import { CountDown } from '../../Components/Basic/CountDown';
import { Timer } from '../../Components/Basic/Timer';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class CounterView extends React.Component {
    constructor(props) {
        super(props);
        this.countDown = () => {
            let now = Date.now();
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
        };
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
    componentDidMount() {
        this.mounted = true;
        this.countDown();
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
