import React from 'react';
import {
    View,
} from 'react-native';

import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { CardText } from '../Basic/CardText';
import { DecCardElementWrapper } from '../Basic/DecCardElementWrapper';
import { IElementViewProps } from '../Shared/BaseProps';
import { StyleManager } from '../Styles/StyleManager';

interface IProps extends IElementViewProps<TextBlockElement> {
}
interface IState {
}

export class TextBlockView extends React.PureComponent<IProps, IState> {
    public render(): JSX.Element {
        const { element, index } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <DecCardElementWrapper
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
                            fontSize: StyleManager.getInstance().getFontSize(element.size),
                            fontWeight: StyleManager.getInstance().getFontWeight(element.weight),
                            color: element.isSubtle ?
                                StyleManager.getInstance().getSubtleColor(element.color) :
                                StyleManager.getInstance().getColor(element.color),
                            textAlign: element.horizontalAlignment,
                            flexWrap: StyleManager.getInstance().getWrapStyle(element.wrap),
                        }}
                        numberOfLines={element.maxLines || undefined}
                    >
                        {element.text}
                    </CardText>
                </View>
            </DecCardElementWrapper>
        );
    }
}
