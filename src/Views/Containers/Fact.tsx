import * as React from 'react';
import { Text, View } from 'react-native';

import { FactNode } from '../../Models/Nodes/Containers/Fact';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps extends IViewProps<FactNode> {
}

export class FactView extends React.Component<IProps> {
    public render() {
        const { model, context, theme } = this.props;

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'stretch'
                }}
            >
                <Text
                    accessible={true}
                    style={{
                        color: StyleManager.getFactTitleColor(theme, context.config),
                        fontSize: StyleManager.getFactTitleFontSize(context.config),
                        fontWeight: StyleManager.getFactTitleFontWeight(context.config),
                        flexWrap: StyleManager.getFactTitleWrap(context.config),
                        marginRight: 16,
                    }}
                >
                    {model.title}
                </Text>
                <Text
                    style={{
                        color: StyleManager.getFactValueColor(theme, context.config),
                        fontSize: StyleManager.getFactValueFontSize(context.config),
                        fontWeight: StyleManager.getFactValueFontWeight(context.config),
                        flexWrap: StyleManager.getFactValueWrap(context.config),
                        marginRight: 16,
                    }}
                >
                    {model.value}
                </Text>
            </View>
        );
    }
}
