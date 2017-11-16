import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';

import {
    Spacing,
} from '../../Schema/enums';
import StyleConfig from '../Style/styleConfig.d';
import styleManager from '../Style/styleManager';
import CardElement from '../../Schema/Elements/CardElement';
import SeparateLine from './SeparateLine';

interface IProps {
    cardElement: CardElement;
    index?: number;
    style?: ViewStyle;
}
interface IState {
}

export default class CardElementWrapper extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: StyleConfig;

    static defaultProps = {
        index: 0,
    };

    constructor(props: IProps) {
        super(props);

        this.styleConfig = styleManager.getStyle();
    }

    render(): JSX.Element {
        const { cardElement, index, style } = this.props;

        if (!cardElement || !cardElement.isValid()) {
            return null;
        }

        const isHorizontalLayout = styleManager.isHorizontalCardElement(cardElement.type);

        if (cardElement.separator) {
            return <View style={style}>
                {this.renderSeparator(cardElement.spacing, isHorizontalLayout)}
                {this.renderWrapper(cardElement.spacing, 0, isHorizontalLayout, { flex: 1 })}
            </View>;
        } else {
            return this.renderWrapper(cardElement.spacing, index, isHorizontalLayout, style);
        }
    }

    private renderWrapper(spacing: Spacing, index: number, isHorizontalLayout: boolean, wrapperStyle: ViewStyle): JSX.Element {
        return <View
            style={[
                wrapperStyle,
                styleManager.getCardElementSpacingStyle(spacing, index, isHorizontalLayout)
            ]}
        >
            {this.props.children}
        </View>;
    }

    private renderSeparator(spacing: Spacing, isHorizontalLayout: boolean): JSX.Element {
        return <SeparateLine
            isHorizontal={isHorizontalLayout}
            margin={styleManager.getCardElementMargin(spacing)}
            color={this.styleConfig.element.separateLineColor}
        />;
    }
}
