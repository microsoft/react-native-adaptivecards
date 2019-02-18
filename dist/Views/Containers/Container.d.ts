import * as React from 'react';
import { ContainerModel } from '../../Models/Containers/Container';
interface IProps {
    index: number;
    model: ContainerModel;
    theme: 'emphasis' | 'default';
}
interface IState {
    disabled: boolean;
}
export declare class ContainerView extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private renderTouchableBlock;
    private renderNonTouchableBlock;
    private renderContent;
    private renderItems;
    private onPress;
    private readonly hasOneTimeAction;
    private readonly justifyContent;
    private readonly flex;
    private readonly spacing;
}
export {};
