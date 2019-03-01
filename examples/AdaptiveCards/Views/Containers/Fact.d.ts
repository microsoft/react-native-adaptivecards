import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { FactModel } from '../../Models/Containers/Fact';
interface IProps {
    model: FactModel;
    theme: 'default' | 'emphasis';
    titleWidth: number | string;
    onTitleLayout?: (event: LayoutChangeEvent) => void;
}
export declare class FactView extends React.Component<IProps> {
    render(): JSX.Element;
}
export {};
