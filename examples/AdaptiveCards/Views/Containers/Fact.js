import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class FactView extends React.Component {
    render() {
        const { model, context, theme } = this.props;
        return (React.createElement(View, { style: {
                flexDirection: 'row',
                alignSelf: 'stretch'
            } },
            React.createElement(Text, { accessible: true, style: {
                    color: StyleManager.getFactTitleColor(theme, context.config),
                    fontSize: StyleManager.getFactTitleFontSize(context.config),
                    fontWeight: StyleManager.getFactTitleFontWeight(context.config),
                    flexWrap: StyleManager.getFactTitleWrap(context.config),
                    marginRight: 16,
                } }, model.title),
            React.createElement(Text, { style: {
                    color: StyleManager.getFactValueColor(theme, context.config),
                    fontSize: StyleManager.getFactValueFontSize(context.config),
                    fontWeight: StyleManager.getFactValueFontWeight(context.config),
                    flexWrap: StyleManager.getFactValueWrap(context.config),
                    marginRight: 16,
                } }, model.value)));
    }
}
