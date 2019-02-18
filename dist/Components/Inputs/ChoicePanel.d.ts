import * as React from 'react';
interface IProps<T extends {
    title: string;
    value: V;
}, V> {
    choices: T[];
    selected: V[];
    show: boolean;
    onChoose: (value: V) => void;
    onClose: () => void;
}
export declare class ChoicePanel<T extends {
    title: string;
    value: V;
}, V> extends React.Component<IProps<T, V>> {
    private panel;
    render(): JSX.Element;
    private renderChoice;
    private renderSeparator;
    private extractKey;
    private isValueSelected;
    private onChoose;
    private onClose;
    private onShow;
}
export {};
