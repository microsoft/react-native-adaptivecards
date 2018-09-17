import * as React from 'react';
import { Text } from 'react-native';

import { TextBlockModel } from '../../Models/CardElements/TextBlock';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: TextBlockModel;
    theme: 'default' | 'emphasis';
}

export class TextBlockView extends React.Component<IProps> {
    public render() {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.text + ' is not valid', theme, 'error');
        }

        return (
            <Text
                accessible={true}
                style={{
                    color: StyleManager.getColor(model.color, this.props.theme, model.isSubtle),
                    fontSize: StyleManager.getFontSize(model.size),
                    fontWeight: StyleManager.getFontWeight(model.weight),
                    backgroundColor: 'transparent',
                    textAlign: StyleManager.getTextAlign(model.horizontalAlignment),
                    flexWrap: StyleManager.getWrap(model.wrap),
                    marginTop: this.spacing
                }}
                numberOfLines={model.maxLines}
            >
                {model.text}
            </Text>
        );
    }

    private get spacing() {
        if (this.props.model.separator) {
            return 0;
        }

        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing);
        }
        return 0;
    }
}
