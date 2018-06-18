import React from 'react';
import {
    Text,
    TextProperties,
} from 'react-native';

import { StyleManager } from '../Styles/StyleManager';

interface IProps extends TextProperties {
}
interface IState {
}

export class CardText extends React.PureComponent<IProps, IState> {
    private fontFamily: string;

    constructor(props: IProps) {
        super(props);

        this.fontFamily = StyleManager.getInstance().getFontFamily();
    }

    public render() {
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
