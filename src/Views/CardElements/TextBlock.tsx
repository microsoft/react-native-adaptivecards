import * as React from 'react';
import { Text } from 'react-native';

import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    element: TextBlockElement;
    theme: 'default' | 'emphasis';
}

export class TextBlockView extends React.Component<IProps> {
    public render() {
        const { element, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.text + ' is not valid', theme, 'error');
        }

        return (
            <Text
                accessible={true}
                style={{
                    color: StyleManager.getColor(element.color, this.props.theme, element.isSubtle),
                    fontSize: StyleManager.getFontSize(element.size),
                    fontWeight: StyleManager.getFontWeight(element.weight),
                    backgroundColor: 'transparent',
                    textAlign: StyleManager.getTextAlign(element.horizontalAlignment),
                    flexWrap: StyleManager.getWrap(element.wrap),
                    marginTop: this.spacing
                }}
                numberOfLines={element.maxLines}
            >
                {element.text}
            </Text>
        );
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.element.spacing);
        }
        return 0;
    }
}
