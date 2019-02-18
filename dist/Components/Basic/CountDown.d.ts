import * as React from 'react';
interface IProps {
    remains: number;
    theme: 'default' | 'emphasis';
    marginTop?: number;
}
export declare class CountDown extends React.Component<IProps> {
    render(): JSX.Element;
}
export {};
