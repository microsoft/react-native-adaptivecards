import * as React from 'react';
interface IProps<T extends {
    title: string;
    value: V;
}, V> {
    choices: T[];
    selected: V[];
    onChoose: (value: V) => void;
    theme: 'default' | 'emphasis';
}
export declare class CheckList<T extends {
    title: string;
    value: V;
}, V> extends React.Component<IProps<T, V>> {
    render(): JSX.Element;
    private renderCheckItem;
    private extractKey;
    private isValueSelected;
    private onChoose;
}
export {};
