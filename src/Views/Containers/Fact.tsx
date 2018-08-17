import * as React from 'react';
import { Text, View } from 'react-native';
import { FactElement } from '../../Schema/Containers/Fact';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    element: FactElement;
    theme: 'default' | 'emphasis';
}

export class FactView extends React.Component<IProps> {
    public render() {
        const { element, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.title + ' is not valid', theme, 'error');
        }

        return (
            <View
                flexDirection='row'
                alignSelf='stretch'
            >
                <Text
                    accessible={true}
                    style={{
                        color: StyleManager.getFactTitleColor(theme),
                        fontSize: StyleManager.factTitleFontSize,
                        fontWeight: StyleManager.factTitleFontWeight,
                        flexWrap: StyleManager.factTitleWrap,
                        marginRight: 16,
                    }}
                >
                    {element.title}
                </Text>
                <Text
                    style={{
                        color: StyleManager.getFactValueColor(theme),
                        fontSize: StyleManager.factValueFontSize,
                        fontWeight: StyleManager.factValueFontWeight,
                        flexWrap: StyleManager.factValueWrap,
                        marginRight: 16,
                    }}
                >
                    {element.value}
                </Text>
            </View>
        );
    }
}
