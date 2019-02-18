import * as React from 'react';
interface IProps {
    remains: number;
    theme: 'default' | 'emphasis';
    marginTop?: number;
}
export declare class Timer extends React.Component<IProps> {
    render(): JSX.Element;
    private readonly timeString;
    private readonly sec;
    private readonly min;
}
export {};
