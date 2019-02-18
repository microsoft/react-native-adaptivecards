import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface IProps {
    url: string;
    alt?: string;
    style?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
}
export declare class Svg extends React.Component<IProps> {
    constructor(props: IProps);
    render(): JSX.Element;
    private readonly html;
    private readonly src;
    private readonly alt;
}
export {};
