import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { ImageElement } from 'Schema/CardElements/Image';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { ImageUtils } from '../../Shared/Utils';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ImageSetElement> {
    containerWidth?: number;
    containerHeight?: number;
}

interface IState {
    maxWidth: number;
    maxHeight: number;
    containerWidth: number;
    containerHeight: number;
}

export class ImageSetView extends React.Component<IProps, IState> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }

        this.state = {
            maxWidth: undefined,
            maxHeight: undefined,
            containerWidth: undefined,
            containerHeight: undefined,
        };
    }

    public componentDidUpdate() {
        const { element, containerWidth, containerHeight } = this.props;
        if (containerWidth && containerHeight &&
            (containerWidth !== this.state.containerWidth || containerHeight !== this.state.containerHeight)) {
            this.setState({
                containerWidth: containerWidth,
                containerHeight: containerHeight,
            });
            ImageUtils.fetchSetSize(
                element.images.map(img => img.url),
                { width: containerWidth, height: containerHeight },
                this.styleConfig.imgSize,
                this.onImageSize,
                (error: any) => {
                    console.log(error);
                }
            );
        }
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <FlatList
                data={element.images}
                renderItem={this.renderImage}
                keyExtractor={this.keyExtractor}
                horizontal={true}
                minHeight={this.state.maxHeight + this.styleConfig.spacing}
            />
        );
    }

    private keyExtractor = (item: ImageElement, index: number) => {
        return `url: ${item.url}, index: ${index}`;
    }

    private renderImage = (info: ListRenderItemInfo<ImageElement>) => {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return undefined;
        }

        return (
            <ImageView
                key={info.index}
                vIndex={1}
                hIndex={info.index}
                element={info.item}
                size={element.imageSize}
                maxWidth={this.state.maxWidth}
                maxHeight={this.state.maxHeight}
                fitAxis='v'
                onImageSize={this.onImageSize}
                hSpace={10}
            />
        );
    }

    private onImageSize = (width: number, height: number) => {
        this.setState({
            maxHeight: height
        });
    }
}
