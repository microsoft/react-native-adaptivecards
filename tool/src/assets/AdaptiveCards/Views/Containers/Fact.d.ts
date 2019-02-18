import * as React from 'react';
import { FactModel } from '../../Models/Containers/Fact';
interface IProps {
    model: FactModel;
    theme: 'default' | 'emphasis';
}
export declare class FactView extends React.Component<IProps> {
    render(): JSX.Element;
}
export {};
