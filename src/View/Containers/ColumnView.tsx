import React from 'react';
import {
    FlexAlignType,
    View,
    ViewStyle,
} from 'react-native';

import { ContentElement } from '../../Schema/Base/ContentElement';
import { ColumnWidth } from '../../Schema/Base/Enums';
import { ColumnElement } from '../../Schema/Containers/Column';
import { CardElementView } from '../Base/CardElementView';
import { CardElementWrapper } from '../Base/CardElementWrapper';
import { ICardElementViewProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps<ColumnElement> {
    containerWidth?: number;
}
interface IState {
}

export class ColumnView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { element, index } = this.props;

        if (!element || !element.isValid() || !element.hasItems()) {
            return null;
        }

        return (
            <CardElementWrapper
                cardElement={element}
                index={index}
                style={this.getViewStyle()}
            >
                <View
                    style={{ flex: 1 }}
                >
                    {
                        element.items.map((cardElement: ContentElement, index: number) =>
                            <CardElementView
                                key={'containerItems' + index}
                                index={index}
                                element={cardElement}
                            />
                        )
                    }
                </View>
            </CardElementWrapper>
        );
    }

    private getViewStyle(): ViewStyle {
        const { element, containerWidth } = this.props;

        if (element.isFixedWidth()) {
            if (element.width < 10) {
                return {
                    flex: element.width as number,
                };
            } else if (containerWidth) {
                // With legacy Adaptive Card "size" property a single digit numbers were treated
                // as relative sizes, whereas anything bigger would be a percentage of the container view width.
                return {
                    width: containerWidth * (element.width as number / 100),
                };
            } else {
                return;
            }
        } else {
            return {
                flex: element.width === ColumnWidth.Auto ? 0 : 1,
                alignSelf: element.width as 'auto' | FlexAlignType,
            };
        }
    }
}
