import * as React from 'react';
import { ChoiceSetModel } from '../../Models/Inputs/ChoiceSet';
interface IProps {
    index: number;
    model: ChoiceSetModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    value: string;
    selected: string[];
    focused: boolean;
}
export declare class ChoiceSetView extends React.Component<IProps, IState> {
    private mounted;
    private button;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void): void;
    render(): JSX.Element | JSX.Element[];
    private renderChoicePanel;
    private renderCheckList;
    private renderRadioList;
    private onValueChange;
    private onStoreUpdate;
    private onPanelClose;
    private onPanelButtonPress;
    private readonly title;
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
