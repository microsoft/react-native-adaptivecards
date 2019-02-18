import * as React from 'react';
import { ColumnSetModel } from '../../Models/Containers/ColumnSet';
interface IProps {
    index: number;
    model: ColumnSetModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    disabled: boolean;
}
export declare class ColumnSetView extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private renderTouchableBlock;
    private renderNonTouchableBlock;
    private renderContent;
    private renderColumns;
    private onPress;
    private readonly hasOneTimeAction;
    private readonly flex;
    private readonly spacing;
}
export {};
