import * as React from 'react';
import { View } from 'react-native';
import { TextBlock } from '../../Components/Basic/TextBlock';
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
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.title + ' is not valid', 'error');
        }

        return (
            <View
                flexDirection='row'
                alignSelf='stretch'
            >
                <TextBlock
                    color={StyleManager.getFactTitleColor(theme)}
                    fontSize={StyleManager.factTitleFontSize}
                    fontWeight={StyleManager.factTitleFontWeight}
                    wrap={StyleManager.factTitleWrap}
                    marginRight={16}
                >
                    {element.title}
                </TextBlock>
                <TextBlock
                    color={StyleManager.getFactValueColor(theme)}
                    fontSize={StyleManager.factValueFontSize}
                    fontWeight={StyleManager.factValueFontWeight}
                    wrap={StyleManager.factValueWrap}
                >
                    {element.value}
                </TextBlock>
            </View>
        );
    }
}
