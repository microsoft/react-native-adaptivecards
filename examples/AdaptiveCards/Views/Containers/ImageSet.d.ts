import * as React from 'react';
import { ImageSetModel } from '../../Models/Containers/ImageSet';
interface IProps {
    index: number;
    model: ImageSetModel;
    theme: 'default' | 'emphasis';
}
export declare class ImageSetView extends React.Component<IProps> {
    render(): JSX.Element;
    private keyExtractor;
    private renderImage;
    private readonly size;
    private getImageSpacing;
    private readonly spacing;
}
export {};
