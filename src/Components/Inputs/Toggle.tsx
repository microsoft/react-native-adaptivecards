import * as React from 'react';
import {
    Switch,
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
                            paddingTop: 18,
                        }
                    ]}
                >
                    <Text
                        style={{
                            color: this.color,
                            fontSize: StyleManager.getFontSize('default'),
                            fontWeight: StyleManager.getFontWeight('default'),
                            textAlign: StyleManager.getTextAlign('left'),
                            width: 0,
                            flex: 1,
                            flexWrap: StyleManager.getWrap(true),
                            paddingRight: 16,
                        }}
                    >
                        {this.props.title}
                    </Text>
                    <Switch
                        onTintColor={this.switchOnColor}
                        tintColor={this.switchOffColor}
                        value={this.props.checked}
                        onValueChange={this.onClick}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    private onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.value);
        }
    }

    private get color() {
        return StyleManager.getCheckboxTitleColor(this.props.theme);
    }

    private get switchOffColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, false);
    }

    private get switchOnColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, true);
    }
}
