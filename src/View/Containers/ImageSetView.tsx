import React from 'react';
import {
    FlatList,
    View,
} from 'react-native';

import { ImageElement } from '../../Schema/CardElements/Image';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { CardElementView } from '../Base/CardElementView';
import { CardElementWrapper } from '../Base/CardElementWrapper';
import { ICardElementViewProps } from '../Shared/BaseProps';
import { styleManager } from '../Styles/StyleManager';

interface IProps extends ICardElementViewProps<ImageSetElement> {
    element: ImageSetElement;
}
interface IState {
}

export class ImageSetView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { element, index } = this.props;

        if (!element || !element.isValid() || !element.hasImages()) {
            return null;
        }

        return (
            <CardElementWrapper element={element} index={index} style={{
                flex: 1,
            }}>
                {
                    styleManager.isHorizontalImageSet() ?
                        <FlatList
                            style={{ flex: 1 }}
                            horizontal={true}
                            data={element.images}
                            renderItem={({ item, index }) => this.renderImage(item, index)}
                            keyExtractor={(item, index) => 'image' + index}
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
                }
            </CardElementWrapper>
        );
    }

    private renderImage = (image: ImageElement, index: number) => {
        const { element } = this.props;

        // Images in the set have their sizes uniformally defined by the container view
        image.setSize(element.imageSize);

        return (
            <CardElementView
                key={'image' + index}
                index={index}
                element={image}
            />
        );
    }
}
