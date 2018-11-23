import * as React from 'react';
import { Text, View } from 'react-native';
import { HostConfig } from '../../Configs/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    title: string;
    level: 'info' | 'warning' | 'error' | 'success';
    theme: 'default' | 'emphasis';
    config: HostConfig;
}

export class Banner extends React.Component<IProps> {
    public render() {
        return (
            <View
                style={{
                    backgroundColor: this.backgroundColor,
                    padding: 8,
                    margin: 4,
                }}
            >
                <Text
                    style={{
                        color: this.color,
                    }}
                >
                    {this.props.title}
                </Text>
                {this.props.children}
            </View>
        );
    }

    private get backgroundColor() {
        switch (this.props.level) {
            case 'info':
                return StyleManager.getColor('accent', this.props.theme, false, this.props.config);
            case 'warning':
                return StyleManager.getColor('warning', this.props.theme, false, this.props.config);
            case 'error':
                return StyleManager.getColor('attention', this.props.theme, false, this.props.config);
            case 'success':
                return StyleManager.getColor('good', this.props.theme, false, this.props.config);
            default:
                return StyleManager.getColor('accent', this.props.theme, false, this.props.config);
        }
    }

    private get color() {
        return StyleManager.getColor('light', this.props.theme, false, this.props.config);
    }
}
