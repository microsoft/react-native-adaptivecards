import * as React from 'react';
import { ColumnModel } from '../../Models/Containers/Column';
interface IProps {
    index: number;
    model: ColumnModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    disabled: boolean;
}
export declare class ColumnView extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private renderTouchableBlock;
    private renderNonTouchableBlock;
    private renderContent;
    private renderItems;
    private onPress;
    private readonly hasOneTimeAction;
    private readonly justifyContent;
    private readonly alignSelf;
    private readonly flex;
    private readonly spacing;
}
export {};
