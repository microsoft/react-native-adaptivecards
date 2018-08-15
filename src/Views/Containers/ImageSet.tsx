import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { ImageElement } from '../../Schema/CardElements/Image';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';

interface IProps {
    index: number;
    element: ImageSetElement;
}

export class ImageSetView extends React.Component<IProps> {
    public render() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        return (
            <FlatList
                data={element.images}
                renderItem={this.renderImage}
                keyExtractor={this.keyExtractor}
                horizontal={true}
                marginTop={this.spacing}
            />
        );
    }

    private keyExtractor = (item: ImageElement, index: number) => {
        return `url: ${item.url}, index: ${index}`;
    }

    private renderImage = (info: ListRenderItemInfo<ImageElement>) => {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return undefined;
        }

        return (
            <ImageView
                key={info.index}
                index={0}
                element={info.item}
                size={this.size}
                maxHeight={StyleManager.inSetImageMaxHeight}
                spacing={this.getImageSpacing(info.index)}
            />
        );
    }

    private get size() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return 'auto';
        }

        if (element.imageSize) {
            return element.imageSize;
        }

        return StyleManager.inSetImageSize;
    }

    private getImageSpacing(index: number) {
        if (index > 0) {
            return StyleManager.getSpacing('default');
        } else {
            return 0;
        }
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
