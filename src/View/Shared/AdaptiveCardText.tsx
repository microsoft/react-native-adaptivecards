import React from 'react';
import {
    Text,
    TextProperties,
} from 'react-native';

import { styleManager } from '../Styles/StyleManager';

interface IProps extends TextProperties {
}
interface IState {
}

export class AdaptiveCardText extends React.PureComponent<IProps, IState> {
    fontFamily: string;

    constructor(props: IProps) {
        super(props);

        this.fontFamily = styleManager.getFontFamily();
    }

    render(): JSX.Element {
        const { style, children } = this.props;

        return (
            <Text
                {...this.props}
                style={[
                    {
                        fontFamily: this.fontFamily || undefined,
                    },
                    style
                ]}
            >
                {children}
            </Text>
        );
    }
}
