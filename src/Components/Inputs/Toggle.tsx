import * as React from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    index: number;
    title: string;
    checked: boolean;
    theme: 'default' | 'emphasis';
    onClick: (index: number) => void;
}

export class Toggle extends React.Component<IProps> {
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
                        }
                    ]}
                >
                    <Icon
                        name={this.radioIcon}
                        size={24}
                        color={this.radioColor}
                    />
                    <Text
                        style={{
                            color: this.color,
                            fontSize: StyleManager.getFontSize('default'),
                            fontWeight: StyleManager.getFontWeight('default'),
                            textAlign: StyleManager.getTextAlign('left'),
                            flexWrap: StyleManager.getWrap(false),
                            paddingLeft: 12,
                            paddingRight: 12,
                        }}
                    >
                        {this.props.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    private onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.index);
        }
    }

    private get color() {
        return StyleManager.getColor('default', this.props.theme, false);
    }

    private get radioColor() {
        if (this.props.checked) {
            return StyleManager.getColor('accent', this.props.theme, false);
        } else {
            return StyleManager.getInputBackgroundColor(this.props.theme);
        }
    }

    private get radioIcon() {
        if (this.props.checked) {
            return 'toggle-on';
        } else {
            return 'toggle-off';
        }
    }
}
