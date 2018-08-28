import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class FactView extends React.Component {
    render() {
        const { model, theme } = this.props;
        return (React.createElement(View, { style: {
                flexDirection: 'row',
                alignSelf: 'stretch'
            } },
            React.createElement(Text, { accessible: true, style: {
                    color: StyleManager.getFactTitleColor(theme),
                    fontSize: StyleManager.factTitleFontSize,
                    fontWeight: StyleManager.factTitleFontWeight,
                    flexWrap: StyleManager.factTitleWrap,
                    marginRight: 16,
                } }, model.title),
            React.createElement(Text, { style: {
                    color: StyleManager.getFactValueColor(theme),
                    fontSize: StyleManager.factValueFontSize,
                    fontWeight: StyleManager.factValueFontWeight,
                    flexWrap: StyleManager.factValueWrap,
                    marginRight: 16,
                } }, model.value)));
    }
}
