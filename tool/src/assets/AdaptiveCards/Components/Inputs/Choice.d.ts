import * as React from 'react';
interface IProps<T> {
    title: string;
    value: T;
    selected: boolean;
    onChoose: (value: T) => void;
}
export declare class Choice<T> extends React.Component<IProps<T>> {
    render(): JSX.Element;
    private onChoose;
    private readonly lineHeight;
    private readonly fontSize;
    private readonly color;
    private readonly backgroundColor;
}
export {};
