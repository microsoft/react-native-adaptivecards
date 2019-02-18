import * as React from 'react';
import { TimeInputModel } from '../../Models/Inputs/TimeInput';
interface IProps {
    index: number;
    model: TimeInputModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    value: string;
    focused: boolean;
}
export declare class TimeInputView extends React.Component<IProps, IState> {
    private mounted;
    private button;
    private tempValue;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void): void;
    render(): JSX.Element | JSX.Element[];
    private onValueChange;
    private onCancel;
    private onSave;
    private onPress;
    private onStoreUpdate;
    private readonly fontSize;
    private readonly fontWeight;
    private readonly paddingVertical;
    private readonly paddingHorizontal;
    private readonly numberOfLine;
    private readonly height;
    private readonly color;
    private readonly backgroundColor;
    private readonly borderColor;
    private readonly spacing;
}
export {};
