import * as React from 'react';
import { ImageStyle, LayoutChangeEvent, StyleProp } from 'react-native';
interface IProps {
    url: string;
    alt?: string;
    flex?: number;
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    width?: number;
    height?: number;
    mode?: 'avatar' | 'default';
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    style?: StyleProp<ImageStyle>;
    onPress?: () => void;
    onLayout?: (event: LayoutChangeEvent) => void;
    onLoad?: (data: any) => void;
    onError?: (error: any) => void;
}
interface IState {
    loaded: boolean;
}
export declare class ImageBlock extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    private renderTouchableBlock;
    private renderNonTouchableBlock;
    private renderPlaceholder;
    private renderImage;
    private onError;
    private onLoad;
    private readonly borderRadius;
}
export {};
