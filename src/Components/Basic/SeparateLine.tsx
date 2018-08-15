import React from 'react';
import { View } from 'react-native';

interface IProps {
    color?: string;
    thick?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
}

export class SeparateLine extends React.PureComponent<IProps, any> {
    public render() {
        return (
            <View
                backgroundColor={this.props.color}
                height={this.props.thick}
                marginTop={this.props.marginTop}
                marginRight={this.props.marginRight}
                marginBottom={this.props.marginBottom}
                marginLeft={this.props.marginLeft}
            />
        );
    }
}
