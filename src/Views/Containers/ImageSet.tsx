import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { ImageNode } from '../../Models/Nodes/CardElements/Image';
import { ImageSetNode } from '../../Models/Nodes/Containers/ImageSet';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';

interface IProps extends IViewProps<ImageSetNode> {
}

export class ImageSetView extends React.Component<IProps> {
    public render() {
        const { model } = this.props;

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

    private keyExtractor = (item: ImageNode, index: number) => {
        return `url: ${item.url}, index: ${index}`;
    }

    private renderImage = (info: ListRenderItemInfo<ImageNode>) => {
        const { model, context, theme } = this.props;

        if (!model) {
            return undefined;
        }

        return (
            <ImageView
                key={info.index}
                index={0}
                model={info.item}
                context={context}
                size={this.size}
                maxHeight={StyleManager.getInSetImageMaxHeight(context.config)}
                spacing={this.getImageSpacing(info.index)}
                theme={theme}
                
            />
        );
    }

    private getImageSpacing(index: number) {
        if (index > 0) {
            return StyleManager.getSpacing('default', this.props.context.config);
        } else {
            return 0;
        }
    }

    private get size() {
        const { model, context } = this.props;

        if (!model) {
            return 'auto';
        }

        if (model.imageSize) {
            return model.imageSize;
        }

        return StyleManager.getInSetImageSize(context.config);
    }

    private get spacing() {
        if (this.props.model.separator) {
            return 0;
        }

        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing, this.props.context.config);
        }
        return 0;
    }
}
