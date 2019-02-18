import * as React from 'react';
import { NumberInputModel } from '../../Models/Inputs/NumberInput';
interface IProps {
    index: number;
    model: NumberInputModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    value: string;
}
export declare class NumberInputView extends React.Component<IProps, IState> {
    private mounted;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setState(state: IState, callback?: () => void): void;
    render(): JSX.Element;
    private onBlur;
    private onFocus;
    private onValueChange;
    private onStoreUpdate;
    private readonly spacing;
}
export {};
