import React from 'react';
import { View } from 'react-native';
import { StyleConfig } from '../../Styles/StyleConfig';

interface IProps {
    height?: number;
    noMargin?: boolean;
}

export class SeparateLine extends React.PureComponent<IProps> {
    public render() {
        return (
            <View
                style={{
                    backgroundColor: StyleConfig.separatorColor,
                    height: StyleConfig.separatorThickness,
                    marginVertical: this.margin,
                }}
            />
        );
    }

    private get margin() {
        if (this.props.noMargin) {
            return 0;
        }
        if (this.props.height && this.props.height > 0) {
            return this.props.height / 2;
        } else {
            return StyleConfig.separatorSpacing;
        }
    }
}
