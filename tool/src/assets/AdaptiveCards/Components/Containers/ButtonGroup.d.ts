import * as React from 'react';
interface IProps {
    hasSpacing: boolean;
    flexDirection: 'row' | 'column';
}
export declare class ButtonGroup extends React.Component<IProps> {
    render(): JSX.Element;
    private readonly topStyles;
}
export {};
