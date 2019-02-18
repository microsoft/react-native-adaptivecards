import * as React from 'react';
import { ToggleInputModel } from '../../Models/Inputs/ToggleInput';
interface IProps {
    index: number;
    model: ToggleInputModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    checked: boolean;
}
export declare class ToggleInputView extends React.Component<IProps, IState> {
    private mounted;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void): void;
    render(): JSX.Element;
    private onClick;
    private onStoreUpdate;
    private readonly spacing;
}
export {};
