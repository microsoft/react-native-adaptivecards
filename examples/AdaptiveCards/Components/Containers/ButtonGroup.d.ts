import * as React from 'react';
interface IProps {
    hasSpacing: boolean;
    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}
export declare class ButtonGroup extends React.Component<IProps> {
    render(): JSX.Element;
    private readonly topStyles;
}
export {};
