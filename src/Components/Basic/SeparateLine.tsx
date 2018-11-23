import React from 'react';
import { View } from 'react-native';
import { HostConfig } from '../../Configs/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    height?: number;
    hasSpacing?: boolean;
    config: HostConfig;
}

export class SeparateLine extends React.Component<IProps> {
    public render() {
        return (
            <View
                style={{
                    backgroundColor: StyleManager.getSeparatorColor(this.props.config),
                    height: StyleManager.getSeparatorThickness(this.props.config),
                    marginVertical: this.margin,
                }}
            />
        );
    }

    private get margin() {
        if (this.props.hasSpacing === false) {
            return 0;
        }
        if (this.props.height && this.props.height > 0) {
            return this.props.height / 2;
        } else {
            return StyleManager.getSeparatorSpacing(this.props.config);
        }
    }
}
