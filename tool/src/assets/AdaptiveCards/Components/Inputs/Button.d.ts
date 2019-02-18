import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface IButtonProps {
    title: string;
    icon?: {
        url: string;
        type: 'img';
        width?: number;
        height?: number;
        position?: 'left' | 'top' | 'right' | 'bottom';
        marginTop?: number;
        marginBottom?: number;
        marginLeft?: number;
        marginRight?: number;
    } | {
        url: string;
        type: 'symbol';
        fontFamily?: string;
        color?: string;
        width?: number;
        height?: number;
        position?: 'left' | 'top' | 'right' | 'bottom';
        marginTop?: number;
        marginBottom?: number;
        marginLeft?: number;
        marginRight?: number;
    };
    onPress: () => void;
    accessibilityLabel?: string;
    disabled?: boolean;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    textHorizontalAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    textVerticalAlign?: 'flex-start' | 'flex-end' | 'center';
    wrap?: 'wrap' | 'nowrap';
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    flex?: number;
    width?: number;
    height?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    style?: StyleProp<ViewStyle>;
}
export declare class Button extends React.Component<IButtonProps> {
    constructor(props: IButtonProps);
    render(): JSX.Element;
    private renderIcon;
    private renderTitle;
    private readonly layoutDirection;
}
