import React from 'react';
import { View } from 'react-native';

import { FactElement } from '../../Schema/Containers/Fact';
import { CardText } from '../Basic/CardText';
import { IElementViewProps } from '../Shared/BaseProps';
import { DecStyleConfig } from '../Styles/DecStyleConfig';
import { DecStyleManager } from '../Styles/DecStyleManager';

interface IProps extends IElementViewProps<FactElement> {
    element: FactElement;
}
interface IState {
}

export class FactView extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: DecStyleConfig;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = DecStyleManager.getInstance().getStyle();
    }

    public render(): JSX.Element {
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
