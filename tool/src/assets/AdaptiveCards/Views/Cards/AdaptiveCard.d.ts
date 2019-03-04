import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CardModel } from '../../Models/Cards/Card';
interface IProps {
    index: number;
    model: CardModel;
    theme: 'default' | 'emphasis';
    style?: StyleProp<ViewStyle>;
}
interface IState {
    subCard?: CardModel;
    width: number;
}
export declare class AdaptiveCardView extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private renderBody;
    private renderActionSet;
    private renderActions;
    private renderSubCard;
    private showSubCard;
    private onLayout;
    private readonly minHeight;
    private readonly buttonFlexDirection;
}
export {};
