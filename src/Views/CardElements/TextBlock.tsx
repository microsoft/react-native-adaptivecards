import * as React from 'react';
import { Text } from 'react-native';

import { TextBlockNode } from '../../Models/Nodes/CardElements/TextBlock';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps extends IViewProps<TextBlockNode> {
}

export class TextBlockView extends React.Component<IProps> {
    public render() {
        const { model, context } = this.props;

        return (
            <Text
                accessible={true}
                style={{
                    color: StyleManager.getColor(model.color, this.props.theme, model.isSubtle, context.config),
                    fontFamily: StyleManager.getFontFamily(context.config),
                    fontSize: StyleManager.getFontSize(model.size, context.config),
                    fontWeight: StyleManager.getFontWeight(model.weight, context.config),
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
            return StyleManager.getSpacing(this.props.model.spacing, this.props.context.config);
        }
        return 0;
    }
}
