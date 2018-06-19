import React from 'react';
import {
    View,
} from 'react-native';

import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { CardText } from '../Basic/CardText';
import { IElementViewProps } from '../Shared/BaseProps';
import { DecStyleManager } from '../Styles/DecStyleManager';

interface IProps extends IElementViewProps<TextBlockElement> {
}
interface IState {
}

export class TextBlockView extends React.PureComponent<IProps, IState> {
    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <View style={{
                flex: 1,
            }}>
                <CardText
                    style={{
                        backgroundColor: 'transparent',
                        fontSize: DecStyleManager.getInstance().getFontSize(element.size),
                        fontWeight: DecStyleManager.getInstance().getFontWeight(element.weight),
                        color: element.isSubtle ?
                            DecStyleManager.getInstance().getSubtleColor(element.color) :
                            DecStyleManager.getInstance().getColor(element.color),
                        textAlign: element.horizontalAlignment,
                        flexWrap: DecStyleManager.getInstance().getWrapStyle(element.wrap),
                    }}
                    numberOfLines={element.maxLines || undefined}
                >
                    {element.text}
                </CardText>
            </View>
        );
    }
}
