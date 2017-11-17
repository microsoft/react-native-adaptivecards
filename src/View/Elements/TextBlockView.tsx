import React from 'react';
import {
    View,
} from 'react-native';

import styleManager from '../Style/styleManager';
import { ICardElementViewProps } from '../view.d';
import AdaptiveCardText from '../Shared/AdaptiveCardText';
import CardElementWrapper from '../Shared/CardElementWrapper';
import TextBlock from '../../Schema/Elements/TextBlock';

interface IProps extends ICardElementViewProps {
    textBlock: TextBlock;
}
interface IState {
}

export default class TextBlockView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { textBlock, index } = this.props;

        if (!textBlock || !textBlock.isValid()) {
            return null;
        }

        return <CardElementWrapper cardElement={textBlock} index={index} style={{
            flex: 1,
        }}>
            <View style={{
                flex: 1,
            }}>
                <AdaptiveCardText
                    style={{
                        backgroundColor: 'transparent',
                        fontSize: styleManager.getFontSize(textBlock.size),
                        fontWeight: styleManager.getFontWeight(textBlock.weight),
                        color: textBlock.isSubtle ? styleManager.getSubtleColor(textBlock.color) : styleManager.getColor(textBlock.color),
                        textAlign: textBlock.horizontalAlignment,
                        flexWrap: styleManager.getWrapStyle(textBlock.wrap),
                    }}
                    numberOfLines={textBlock.maxLines || undefined}
                >
                    {textBlock.text}
                </AdaptiveCardText>
            </View>
        </CardElementWrapper>;
    }
}
