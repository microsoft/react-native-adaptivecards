import * as React from 'react';
import { FactSetModel } from '../../Models/Containers/FactSet';
interface IProps {
    index: number;
    model: FactSetModel;
    theme: 'default' | 'emphasis';
}
export declare class FactSetView extends React.Component<IProps> {
    render(): JSX.Element;
    private renderFacts;
    private readonly spacing;
}
export {};
