import React from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    View,
} from 'react-native';

import { ImageElement } from '../../Schema/CardElements/Image';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { ContentElementView } from '../Factories/ContentElementView';
import { IElementViewProps } from '../Shared/BaseProps';
import { DecStyleManager } from '../Styles/DecStyleManager';

interface IProps extends IElementViewProps<ImageSetElement> {
    element: ImageSetElement;
}
interface IState {
}

export class ImageSetView extends React.PureComponent<IProps, IState> {
    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid() || !element.hasImages()) {
            return null;
        }

        return (DecStyleManager.getInstance().isHorizontalImageSet() ?
            <FlatList
                style={{ flex: 1 }}
                horizontal={true}
                data={element.images}
                renderItem={this.renderListItem}
                keyExtractor={this.extractKey}
                showsHorizontalScrollIndicator={false}
            />
            :
            <View
                style={{
                    flex: 1,
                    flexWrap: 'wrap',
                }}
            >
                {
                    element.images.map(this.renderImage)
                }
            </View>
        );
    }

    private renderListItem = (renderInfo: ListRenderItemInfo<ImageElement>) => {
        return this.renderImage(renderInfo.item, renderInfo.index);
    }

    private renderImage = (image: ImageElement, index: number) => {
        const { element } = this.props;

        // Images in the set have their sizes uniformally defined by the container view
        image.setSize(element.imageSize);

        return (
            <ContentElementView
                key={'img' + image.url}
                index={index}
                element={image}
            />
        );
    }

    private extractKey = (image: ImageElement) => {
        return 'img-set-img' + image.url;
    }
}
