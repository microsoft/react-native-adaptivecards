import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    index: number;
    title: string;
    focused: boolean;
    theme: 'default' | 'emphasis';
    onPress: (index: number) => void;
}

export class Label extends React.Component<IProps> {
    public render() {
        if (this.props.title) {
            return (
                <TouchableWithoutFeedback
                    onPress={this.onPress}
                >
                    <View
                        style={{
                            backgroundColor: this.backgroundColor,
                            paddingTop: this.paddingVertical - 6,
                            paddingBottom: this.paddingVertical - 6,
                            borderRadius: 4,
                            paddingLeft: 6,
                            paddingRight: 6,
                            marginTop: 6,
                            marginBottom: 6,
                            marginLeft: 6,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: this.fontSize,
                                fontWeight: this.fontWeight,
                                color: this.color,
                            }}
                        >
                            {this.props.title}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        return undefined;
    }

    private onPress = () => {
        if (this.props.onPress) {
            this.props.onPress(this.props.index);
        }
    }

    private get fontSize() {
        return StyleManager.getFontSize('default');
    }

    private get fontWeight() {
        return StyleManager.getFontWeight('default');
    }

    private get paddingVertical() {
        return 12;
    }

    private get color() {
        return StyleManager.getColor('light', this.props.theme, false);
    }

    private get backgroundColor() {
        if (this.props.focused) {
            return StyleManager.getColor('accent', this.props.theme, false);
        } else {
            return StyleManager.getColor('accent', this.props.theme, true);
        }
    }
}
