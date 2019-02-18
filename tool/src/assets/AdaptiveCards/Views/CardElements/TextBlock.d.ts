import * as React from 'react';
import { TextBlockModel } from '../../Models/CardElements/TextBlock';
interface IProps {
    index: number;
    model: TextBlockModel;
    theme: 'default' | 'emphasis';
}
export declare class TextBlockView extends React.Component<IProps> {
    render(): JSX.Element;
    private readonly spacing;
}
export {};
