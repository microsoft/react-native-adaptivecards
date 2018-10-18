import * as React from 'react';
import { Text } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class TextBlockView extends React.Component {
    render() {
        const { model, context } = this.props;
        return (React.createElement(Text, { accessible: true, style: {
                color: StyleManager.getColor(model.color, this.props.theme, model.isSubtle, context.config),
                fontSize: StyleManager.getFontSize(model.size, context.config),
                fontWeight: StyleManager.getFontWeight(model.weight, context.config),
                backgroundColor: 'transparent',
                textAlign: StyleManager.getTextAlign(model.horizontalAlignment),
                flexWrap: StyleManager.getWrap(model.wrap),
                marginTop: this.spacing
            }, numberOfLines: model.maxLines }, model.text));
    }
    get spacing() {
        if (this.props.model.separator) {
            return 0;
        }
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getSpacing(this.props.model.spacing, this.props.context.config);
        }
        return 0;
    }
}
