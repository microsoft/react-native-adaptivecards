import * as React from 'react';
import { FactSetModel } from '../../Models/Containers/FactSet';
interface IProps {
    index: number;
    model: FactSetModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    width: number | string;
}
export declare class FactSetView extends React.Component<IProps, IState> {
    private factCount;
    private widths;
    constructor(props: IProps);
    render(): JSX.Element;
    private renderFacts;
    private readonly spacing;
    private onTitleLayout;
}
export {};
