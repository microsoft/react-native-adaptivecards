import React from 'react';
import {
    FlatList,
    View,
} from 'react-native';

import styleManager from '../Style/styleManager';
import Image from '../../Schema/Elements/Image';
import ImageSet from '../../Schema/Containers/ImageSet';
import { ICardElementViewProps } from '../view.d';
import CardElementWrapper from '../Shared/CardElementWrapper';
import CardElementView from '../Elements/CardElementView';

interface IProps extends ICardElementViewProps {
    imageSet: ImageSet;
}
interface IState {
}

export default class ImageSetView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { imageSet, index } = this.props;

        if (!imageSet || !imageSet.isValid() || !imageSet.hasImages()) {
            return null;
        }

        return <CardElementWrapper cardElement={imageSet} index={index} style={{
            flex: 1,
        }}>
            {
                styleManager.isHorizontalImageSet() ?
                    <FlatList
                        style={{ flex: 1 }}
                        horizontal={true}
                        data={imageSet.images}
                        renderItem={({ item, index }) => this.renderImage(item, index)}
                        keyExtractor={(item, index) => 'image' + index}
                        showsHorizontalScrollIndicator={false}
                    />
                    :
                    <View style={{
                        flex: 1,
                        flexWrap: 'wrap',
                    }}>
                        {
                            imageSet.images.map(this.renderImage)
                        }
                    </View>
            }
        </CardElementWrapper>;
    }

    private renderImage = (image: Image, index: number) => {
        const { imageSet } = this.props;

        // Images in the set have their sizes uniformally defined by the container view
        image.setSize(imageSet.imageSize);

        return <CardElementView
            key={'image' + index}
            index={index}
            cardElement={image}
        />;
    }
}
