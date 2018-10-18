import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleConfig } from '../../Styles/StyleConfig';

interface IProps {
    title: string;
    level: 'info' | 'warning' | 'error' | 'success';
    theme: 'default' | 'emphasis';
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
                return StyleConfig.getColor('accent', this.props.theme, false);
            case 'warning':
                return StyleConfig.getColor('warning', this.props.theme, false);
            case 'error':
                return StyleConfig.getColor('attention', this.props.theme, false);
            case 'success':
                return StyleConfig.getColor('good', this.props.theme, false);
            default:
                return StyleConfig.getColor('accent', this.props.theme, false);
        }
    }

    private get color() {
        return StyleConfig.getColor('light', this.props.theme, false);
    }
}
