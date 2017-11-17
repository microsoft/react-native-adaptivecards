import React from 'react';
import {
    View,
} from 'react-native';

import StyleConfig from '../Style/styleConfig.d';
import styleManager from '../Style/styleManager';
import AdaptiveCardText from '../Shared/AdaptiveCardText';
import Fact from '../../Schema/Containers/Fact';

interface IProps {
    fact: Fact;
}
interface IState {
}

export default class FactView extends React.PureComponent<IProps, IState> {
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

        return <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start'
        }}
        >
            <AdaptiveCardText style={{
                color: this.styleConfig.fact.titleColor,
                marginRight: this.styleConfig.fact.spacing,
            }}
            >
                {fact.title}
            </AdaptiveCardText>
            <AdaptiveCardText style={{
                color: this.styleConfig.fact.valueColor,
                marginLeft: this.styleConfig.fact.spacing,
            }}
            >
                {fact.value}
            </AdaptiveCardText>
        </View>;
    }
}
