import * as React from 'react';
import { CounterModel } from '../../Models/Customs/Microsoft.Counter';
interface IProps {
    index: number;
    model: CounterModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    remains: number;
}
export declare class CounterView extends React.Component<IProps, IState> {
    private mounted;
    private startTime;
    private endTime;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setState<IState>(state: IState, callback?: () => void): void;
    render(): JSX.Element;
    private countDown;
    private readonly spacing;
}
export {};
