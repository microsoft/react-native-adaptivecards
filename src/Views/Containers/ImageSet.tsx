import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { ImageElement } from '../../Schema/CardElements/Image';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    element: ImageSetElement;
    theme: 'default' | 'emphasis';
}

export class ImageSetView extends React.Component<IProps> {
    public render() {
        const { element, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.id + ' is not valid', theme, 'error');
        }

        return (
            <FlatList
                data={element.images}
                renderItem={this.renderImage}
                keyExtractor={this.keyExtractor}
                horizontal={true}
                style={{
                    marginTop: this.spacing
                }}
            />
        );
    }

    private keyExtractor = (item: ImageElement, index: number) => {
        return `url: ${item.url}, index: ${index}`;
    }

    private renderImage = (info: ListRenderItemInfo<ImageElement>) => {
        const { element, theme } = this.props;

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
                theme={theme}
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
