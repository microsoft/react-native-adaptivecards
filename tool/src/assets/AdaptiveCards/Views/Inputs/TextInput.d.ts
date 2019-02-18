import * as React from 'react';
import { TextInputModel } from '../../Models/Inputs/TextInput';
interface IProps {
    index: number;
    model: TextInputModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    value: string;
}
export declare class TextInputView extends React.Component<IProps, IState> {
    private mounted;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void): void;
    render(): JSX.Element;
    private onBlur;
    private onFocus;
    private onValueChange;
    private onStoreUpdate;
    private readonly numberOfLine;
    private readonly spacing;
}
export {};
