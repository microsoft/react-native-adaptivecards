import * as React from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { StyleManager } from '../../Styles/StyleManager';

interface IProps<T> {
    title: string;
    value: T;
    checked: boolean;
    theme: 'default' | 'emphasis';
    onClick: (value: T) => void;
}

export class Checkbox<T> extends React.Component<IProps<T>> {
    public render() {
        return (
            <TouchableWithoutFeedback
                onPress={this.onClick}
            >
                <View
                    style={[
                        {
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'stretch',
                            paddingTop: 18,
                        }
                    ]}
                >
                    {this.props.checked ? this.renderCheckedBox() : this.renderUncheckedBox()}
                    <Text
                        style={{
                            color: this.color,
                            fontSize: StyleManager.getFontSize('default'),
                            fontWeight: StyleManager.getFontWeight('default'),
                            textAlign: StyleManager.getTextAlign('left'),
                            width: 0,
                            flex: 1,
                            flexWrap: StyleManager.getWrap(true),
                            paddingLeft: 16,
                        }}
                    >
                        {this.props.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    private renderCheckedBox = () => {
        return (
            <View
                style={{
                    height: 18,
                    width: 18,
                    borderWidth: 2,
                    borderColor: this.checkboxColor,
                    backgroundColor: this.props.checked ? this.checkboxColor : 'transparent',
                    borderRadius: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [{ rotate: '45deg' }, { translateY: -2 }, { translateX: -1.5 }]
                    }}>
                    <View style={{
                        width: 6,
                        height: 2,
                        borderRadius: 1,
                        backgroundColor: 'white',
                        transform: [{ translateY: 7 }]
                    }} />
                    <View
                        style={{
                            width: 12,
                            height: 2,
                            borderRadius: 1,
                            backgroundColor: 'white',
                            transform: [{ translateX: 3 }, { rotate: '90deg' }]
                        }} />
                </View>
            </View>
        );
    }

    private renderUncheckedBox = () => {
        return (
            <View
                style={{
                    width: 18,
                    height: 18,
                    borderWidth: 2,
                    borderColor: this.checkboxColor,
                    borderRadius: 2
                }}
            />
        );
    }

    private onClick = () => {
        console.log('Checkbox clicked');
        console.log(this.props.value);
        if (this.props.onClick) {
            this.props.onClick(this.props.value);
        }
    }

    private get color() {
        return StyleManager.getCheckboxTitleColor(this.props.theme);
    }

    private get checkboxColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, this.props.checked);
    }
}
