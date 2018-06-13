import React from 'react';
import {
    View,
} from 'react-native';

import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { CardElementWrapper } from '../Base/CardElementWrapper';
import { CardText } from '../Base/CardText';
import { ICardElementViewProps } from '../Shared/BaseProps';
import { styleManager } from '../Styles/StyleManager';

interface IProps extends ICardElementViewProps<TextBlockElement> {
}
interface IState {
}

export class TextBlockView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { element, index } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <CardElementWrapper
                element={element}
                index={index}
                style={{
                    flex: 1,
                }}>
                <View style={{
                    flex: 1,
                }}>
                    <CardText
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: styleManager.getFontSize(element.size),
                            fontWeight: styleManager.getFontWeight(element.weight),
                            color: element.isSubtle ?
                                styleManager.getSubtleColor(element.color) :
                                styleManager.getColor(element.color),
                            textAlign: element.horizontalAlignment,
                            flexWrap: styleManager.getWrapStyle(element.wrap),
                        }}
                        numberOfLines={element.maxLines || undefined}
                    >
                        {element.text}
                    </CardText>
                </View>
            </CardElementWrapper>
        );
    }
}
