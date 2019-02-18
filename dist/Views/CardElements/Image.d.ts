import * as React from 'react';
import { ImageModel } from '../../Models/CardElements/Image';
interface IProps {
    index: number;
    model: ImageModel;
    size?: 'auto' | 'stretch' | 'small' | 'medium' | 'large';
    spacing?: number;
    maxWidth?: number;
    maxHeight?: number;
    theme: 'emphasis' | 'default';
}
interface IState {
    loaded: boolean;
    width: number;
    height: number;
}
export declare class ImageView extends React.Component<IProps, IState> {
    private mounted;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    setState<K extends keyof IState>(state: ((prevState: Readonly<IState>, props: Readonly<IProps>) => (Pick<IState, K> | IState | null)) | (Pick<IState, K> | IState | null), callback?: () => void): void;
    render(): JSX.Element;
    private onPress;
    private onLayout;
    private onImageLoad;
    private onImageError;
    private onImageSizeError;
    private handleError;
    private onImageSize;
    private fetchImageSize;
    private readonly flex;
    private readonly spacing;
}
export {};
