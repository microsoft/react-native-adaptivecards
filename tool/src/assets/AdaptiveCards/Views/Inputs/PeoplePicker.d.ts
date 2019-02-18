import * as React from 'react';
import { CardModel } from '../../Models/Cards/Card';
import { PeoplePickerModel } from '../../Models/Inputs/PeoplePicker';
interface IProps {
    index: number;
    model: PeoplePickerModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    value: string;
    selected: Array<{
        Name: string;
        Address: string;
    }>;
    inputFocused: boolean;
    suggestionCard: CardModel;
}
export declare class PeoplePickerView extends React.Component<IProps, IState> {
    private mounted;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void): void;
    render(): JSX.Element;
    private onContactLabelRemove;
    private onBlur;
    private onFocus;
    private onRequestSuggestion;
    private onSuggestionSelected;
    private onSuggestionReady;
    private onStoreUpdate;
    private readonly labels;
    private readonly spacing;
}
export {};
