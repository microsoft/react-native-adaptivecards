import * as React from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { HostConfig } from '../../Configs/Types';
import { IChoice } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps<T> extends IChoice<T> {
    index: number;
    theme: 'default' | 'emphasis';
    config: HostConfig;
    onCheck: (index: number) => void;
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
                    <Icon
                        name={this.radioIcon}
                        size={24}
                        color={this.radioColor}
                        style={{
                            paddingTop: 4,
                        }}
                    />
                    <Text
                        style={{
                            color: this.color,
                            fontSize: StyleManager.getFontSize('default', this.props.config),
                            fontWeight: StyleManager.getFontWeight('default', this.props.config),
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

    private onClick = () => {
        if (this.props.onCheck) {
            this.props.onCheck(this.props.index);
        }
    }

    private get color() {
        return StyleManager.getCheckboxTitleColor(this.props.theme, this.props.config);
    }

    private get radioColor() {
        return StyleManager.getCheckboxBoxColor(this.props.theme, this.props.selected, this.props.config);
    }

    private get radioIcon() {
        if (this.props.selected) {
            return 'check-box';
        } else {
            return 'check-box-outline-blank';
        }
    }
}
