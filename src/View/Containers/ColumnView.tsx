import React from 'react';
import {
    View,
    ViewStyle,
    FlexAlignType,
} from 'react-native';

import {
    ColumnWidth,
} from '../../Schema/enums';
import CardElement from '../../Schema/Elements/CardElement';
import Column from '../../Schema/Containers/Column';
import { ICardElementViewProps } from '../view.d';
import CardElementWrapper from '../Shared/CardElementWrapper';
import CardElementView from '../Elements/CardElementView';

interface IProps extends ICardElementViewProps {
    column: Column;
    containerWidth?: number;
}
interface IState {
}

export default class ColumnView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { column, index } = this.props;

        if (!column || !column.isValid() || !column.hasItems()) {
            return null;
        }

        return <CardElementWrapper cardElement={column} index={index} style={this.getViewStyle()}>
            <View style={{ flex: 1 }}>
                {
                    column.items.map((cardElement: CardElement, index: number) =>
                        <CardElementView
                            key={'containerItems' + index}
                            index={index}
                            cardElement={cardElement}
                        />
                    )
                }
            </View>
        </CardElementWrapper>;
    }

    private getViewStyle(): ViewStyle {
        const { column, containerWidth } = this.props;

        if (column.isFixedWidth()) {
            if (column.width < 10) {
                return {
                    flex: column.width as number,
                };
            } else if (containerWidth) {
                // With legacy Adaptive Card "size" property a single digit numbers were treated
                // as relative sizes, whereas anything bigger would be a percentage of the container view width.
                return {
                    width: containerWidth * (column.width as number / 100),
                };
            } else {
                return;
            }
        } else {
            return {
                flex: column.width === ColumnWidth.Auto ? 0 : 1,
                alignSelf: column.width as 'auto' | FlexAlignType,
            };
        }
    }
}
