import * as React from 'react';
import { BackgroundImageModel } from '../../Models/CardElements/BackgroundImage';
interface IProps {
    model: BackgroundImageModel;
    theme: 'emphasis' | 'default';
}
export declare class BackgroundImageView extends React.Component<IProps> {
    componentDidMount(): void;
    render(): JSX.Element;
    private onImageLoad;
    private onError;
}
export {};
