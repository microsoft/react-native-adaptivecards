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

export class RadioBox<T> extends React.Component<IProps<T>> {
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
                    {this.props.checked ? this.renderCheckedRadio() : this.renderUncheckedRadio()}
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

    private renderCheckedRadio = () => {
        return (
            <View
                style={{
                    width: 18,
                    height: 18,
                    borderWidth: 1,
                    borderColor: this.radioColor,
                    borderRadius: 9,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{
                        width: 10,
                        height: 10,
                        backgroundColor: this.radioColor,
                        borderRadius: 5
                    }}
                />
            </View>
        );
    }

    private renderUncheckedRadio = () => {
        return (
            <View
                style={{
                    width: 18,
                    height: 18,
                    borderWidth: 1,
                    borderColor: this.radioColor,
                    borderRadius: 9
                }}
            />
        );
    }

    private onClick = () => {
        console.log('RadioBox clicked');
        if (this.props.onClick) {
            this.props.onClick(this.props.value);
        }
    }

    private get color() {
        return StyleManager.getCheckboxTitleColor(this.props.theme);
    }

    private get radioColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, this.props.checked);
    }
}
