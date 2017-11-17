import React from 'react';
import {
    Text,
    TextProperties,
} from 'react-native';

import styleManager from '../Style/styleManager';

interface IProps extends TextProperties {
}
interface IState {
}

export default class AdaptiveCardText extends React.PureComponent<IProps, IState> {
    fontFamily: string;

    static defaultProps = {
        ...Text.defaultProps,
    };

    constructor(props: IProps) {
        super(props);

        this.fontFamily = styleManager.getFontFamily();
    }

    render(): JSX.Element {
        const { style, children } = this.props;

        return <Text {...this.props} style={[{
            fontFamily: this.fontFamily || undefined,
        }, style]}
        >
            {children}
        </Text>;
    }
}
