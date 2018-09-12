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
                    <Icon
                        name={this.radioIcon}
                        size={24}
                        color={this.radioColor}
                    />
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
        return StyleManager.getCheckboxTitleColor(this.props.theme);
    }

    private get radioColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, this.props.checked);
    }

    private get radioIcon() {
        if (this.props.checked) {
            return 'toggle-on';
        } else {
            return 'toggle-off';
        }
    }
}
