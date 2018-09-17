import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { ImageModel } from '../../Models/CardElements/Image';
import { ImageSetModel } from '../../Models/Containers/ImageSet';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: ImageSetModel;
    theme: 'default' | 'emphasis';
}

export class ImageSetView extends React.Component<IProps> {
    public render() {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }

        return (
            <FlatList
                data={model.images}
                renderItem={this.renderImage}
                keyExtractor={this.keyExtractor}
                horizontal={true}
                style={{
                    marginTop: this.spacing
                }}
            />
        );
    }

    private keyExtractor = (item: ImageModel, index: number) => {
        return `url: ${item.url}, index: ${index}`;
    }

    private renderImage = (info: ListRenderItemInfo<ImageModel>) => {
        const { model, theme } = this.props;

        if (!model) {
            return undefined;
        }

        return (
            <ImageView
                key={info.index}
                index={0}
                model={info.item}
                size={this.size}
                maxHeight={StyleManager.inSetImageMaxHeight}
                spacing={this.getImageSpacing(info.index)}
                theme={theme}
            />
        );
    }

    private get size() {
        const { model } = this.props;

        if (!model) {
            return 'auto';
        }

        if (model.imageSize) {
            return model.imageSize;
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
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return StyleManager.getSpacing('default');
    }
}
