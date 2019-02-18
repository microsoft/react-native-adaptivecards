import * as React from 'react';
interface IProps {
    title: string;
    level: 'info' | 'warning' | 'error' | 'success';
    theme: 'default' | 'emphasis';
}
export declare class Banner extends React.Component<IProps> {
    render(): JSX.Element;
    private readonly backgroundColor;
    private readonly color;
}
export {};
