import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    title: string;
    level: 'info' | 'warning' | 'error' | 'success';
    theme: 'default' | 'emphasis';
}

export class Banner extends React.Component<IProps> {
    public render() {
        return (
            <View style={{
                backgroundColor: this.backgroundColor,
                paddingTop: 8,
                paddingRight: 8,
                paddingBottom: 8,
                paddingLeft: 8,
                marginTop: 4,
                marginRight: 4,
                marginBottom: 4,
                marginLeft: 4
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
                return StyleManager.getColor('accent', this.props.theme, false);
            case 'warning':
                return StyleManager.getColor('warning', this.props.theme, false);
            case 'error':
                return StyleManager.getColor('attention', this.props.theme, false);
            case 'success':
                return StyleManager.getColor('good', this.props.theme, false);
            default:
                return StyleManager.getColor('accent', this.props.theme, false);
        }
    }

    private get color() {
        return StyleManager.getBackgroundColor(this.props.theme);
    }
}
