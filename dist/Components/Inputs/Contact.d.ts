import * as React from 'react';
interface IProps {
    avatar: string;
    mainInfo: string;
    subInfo: string;
    hiddenFields: any;
    theme: 'default' | 'emphasis';
    onSelect?: (data: any) => void;
}
export declare class Contact extends React.Component<IProps> {
    render(): JSX.Element;
    private renderTouchableBlock;
    private renderNonTouchableBlock;
    private renderContent;
    private onPress;
}
export {};
