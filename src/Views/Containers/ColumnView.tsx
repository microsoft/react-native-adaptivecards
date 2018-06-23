import React from 'react';
import {
    FlexAlignType,
    View,
    ViewStyle,
} from 'react-native';

import { ContentElement } from '../../Schema/Base/ContentElement';
import { ColumnElement } from '../../Schema/Containers/Column';
import { ColumnWidth } from '../../Shared/Enums';
import { ContentFactory } from '../Factories/ContentFactory';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ColumnElement> {
    containerWidth?: number;
}
interface IState {
}

export class ColumnView extends React.PureComponent<IProps, IState> {
    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid() || !element.hasItems()) {
            return null;
        }

        return (
            <View
                style={this.getViewStyle()}
            >
                {
                    element.items.map((contentElement: ContentElement, index: number) =>
                        ContentFactory.createView(contentElement, index, false)
                    )
                }
            </View>
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
