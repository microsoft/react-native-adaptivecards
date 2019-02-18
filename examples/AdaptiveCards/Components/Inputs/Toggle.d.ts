import * as React from 'react';
interface IProps<T> {
    title: string;
    value: T;
    checked: boolean;
    marginTop?: number;
    theme: 'default' | 'emphasis';
    onClick: (value: T) => void;
}
export declare class Toggle<T> extends React.Component<IProps<T>> {
    render(): JSX.Element;
    private onClick;
    private readonly color;
    private readonly switchOffColor;
    private readonly switchOnColor;
}
export {};
