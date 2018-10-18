import * as React from 'react';
import {
    Switch,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { StyleConfig } from '../../Styles/StyleConfig';

export interface ISwitchable<T> {
    title: string;
    value: T;
    activated: boolean;
}

interface IProps<T> extends ISwitchable<T> {
    marginTop?: number;
    theme: 'default' | 'emphasis';
    onSwitch: (value: T) => void;
}

export class Toggle<T> extends React.Component<IProps<T>> {
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
                            marginTop: this.props.marginTop,
                        }
                    ]}
                >
                    <Text
                        style={{
                            color: this.color,
                            fontSize: StyleConfig.getFontSize('default'),
                            fontWeight: StyleConfig.getFontWeight('default'),
                            textAlign: StyleConfig.getTextAlign('left'),
                            width: 0,
                            flex: 1,
                            flexWrap: StyleConfig.getWrap(true),
                            paddingRight: 16,
                        }}
                    >
                        {this.props.title}
                    </Text>
                    <Switch
                        onTintColor={this.switchOnColor}
                        tintColor={this.switchOffColor}
                        value={this.props.activated}
                        onValueChange={this.onClick}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    private onClick = () => {
        if (this.props.onSwitch) {
            this.props.onSwitch(this.props.value);
        }
    }

    private get color() {
        return StyleConfig.getCheckboxTitleColor(this.props.theme);
    }

    private get switchOffColor() {
        return StyleConfig.getCheckboxBoxColor(this.props.theme, false);
    }

    private get switchOnColor() {
        return StyleConfig.getCheckboxBoxColor(this.props.theme, true);
    }
}
