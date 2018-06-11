import React from 'react';
import { View } from 'react-native';

import { FactElement } from '../../Schema/Containers/Fact';
import { AdaptiveCardText } from '../Shared/AdaptiveCardText';
import { StyleConfig } from '../Styles/StyleConfig';
import { styleManager } from '../Styles/StyleManager';

interface IProps {
    fact: FactElement;
}
interface IState {
}

export class FactView extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = styleManager.getStyle();
    }

    render(): JSX.Element {
        const { fact } = this.props;

        if (!fact || !fact.isValid()) {
            return null;
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                }}
            >
                <AdaptiveCardText
                    style={{
                        color: this.styleConfig.fact.titleColor,
                        marginRight: this.styleConfig.fact.spacing,
                    }}
                >
                    {fact.title}
                </AdaptiveCardText>
                <AdaptiveCardText
                    style={{
                        color: this.styleConfig.fact.valueColor,
                        marginLeft: this.styleConfig.fact.spacing,
                    }}
                >
                    {fact.value}
                </AdaptiveCardText>
            </View>);
    }
}
