import React from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';
interface IProps {
    url: string;
    flex?: number;
    resizeMode?: 'stretch' | 'repeat' | 'repeatHorizontally' | 'repeatVertically';
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    onLoad?: (data: any) => void;
    onError?: (error: any) => void;
}
interface IState {
    containerRatio: number;
    imgRatio: number;
}
export declare class ImageBackground extends React.Component<IProps, IState> {
    constructor(props: IProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private onLoad;
    private onError;
    private onLayout;
    private fetchImageSize;
    private readonly resizeMethod;
}
export {};
