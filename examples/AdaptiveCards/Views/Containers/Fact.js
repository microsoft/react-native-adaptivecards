import * as React from 'react';
import { View } from 'react-native';
import { TextBlock } from '../../Components/Basic/TextBlock';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';
export class FactView extends React.Component {
    render() {
        const { element, theme } = this.props;
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.title + ' is not valid', 'error');
        }
        return (React.createElement(View, { flexDirection: 'row', alignSelf: 'stretch' },
            React.createElement(TextBlock, { color: StyleManager.getFactTitleColor(theme), fontSize: StyleManager.factTitleFontSize, fontWeight: StyleManager.factTitleFontWeight, wrap: StyleManager.factTitleWrap, marginRight: 16 }, element.title),
            React.createElement(TextBlock, { color: StyleManager.getFactValueColor(theme), fontSize: StyleManager.factValueFontSize, fontWeight: StyleManager.factValueFontWeight, wrap: StyleManager.factValueWrap }, element.value)));
    }
}
