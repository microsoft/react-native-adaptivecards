import * as React from 'react';
import { OpenUrlActionModel } from '../../Models/Actions/OpenUrlAction';
import { ShowCardActionModel } from '../../Models/Actions/ShowCardAction';
import { SubmitActionModel } from '../../Models/Actions/SubmitAction';
interface IProps {
    index: number;
    model: OpenUrlActionModel | ShowCardActionModel | SubmitActionModel;
    theme: 'default' | 'emphasis';
}
interface IState {
    disabled: boolean;
}
export declare class ActionView extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private onPress;
    private readonly isOneTimeAction;
    private readonly leftBorderWidth;
    private readonly spacing;
    private readonly title;
}
export {};
