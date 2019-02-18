import * as React from 'react';
import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
interface IProps {
    flex?: number;
    fit?: 'content' | 'container';
    theme?: 'default' | 'emphasis';
    backgroundImageUrl?: string;
    onLayout?: (event: LayoutChangeEvent) => void;
    style?: StyleProp<ViewStyle>;
}
export declare class Card extends React.Component<IProps> {
    render(): JSX.Element;
    private renderCardContent;
    private readonly contentFlex;
}
export {};
