import React from 'react';
import { View } from 'react-native';

import { FactElement } from '../../Schema/Containers/Fact';
import { CardText } from '../Base/CardText';
import { ICardElementViewProps } from '../Shared/BaseProps';
import { StyleConfig } from '../Styles/StyleConfig';
import { styleManager } from '../Styles/StyleManager';

interface IProps extends ICardElementViewProps<FactElement> {
    element: FactElement;
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
        const { element } = this.props;

        if (!element || !element.isValid()) {
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
                <CardText
                    style={{
                        color: this.styleConfig.fact.titleColor,
                        marginRight: this.styleConfig.fact.spacing,
                    }}
                >
                    {element.title}
                </CardText>
                <CardText
                    style={{
                        color: this.styleConfig.fact.valueColor,
                        marginLeft: this.styleConfig.fact.spacing,
                    }}
                >
                    {element.value}
                </CardText>
            </View>);
    }
}
