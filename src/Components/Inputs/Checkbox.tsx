import * as React from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { ISelectable } from '../../Shared/Types';
import { StyleConfig } from '../../Styles/StyleConfig';

export interface ICheckable<T> extends ISelectable<T> {
    checked: boolean;
}

interface IProps<T> extends ICheckable<T> {
    theme: 'default' | 'emphasis';
    onCheck: (value: T) => void;
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
                            fontSize: StyleConfig.getFontSize('default'),
                            fontWeight: StyleConfig.getFontWeight('default'),
                            textAlign: StyleConfig.getTextAlign('left'),
                            width: 0,
                            flex: 1,
                            flexWrap: StyleConfig.getWrap(true),
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
        console.log('Checkbox clicked');
        console.log(this.props.value);
        if (this.props.onCheck) {
            this.props.onCheck(this.props.value);
        }
    }

    private get color() {
        return StyleConfig.getCheckboxTitleColor(this.props.theme);
    }

    private get radioColor() {
        return StyleConfig.getCheckboxBoxColor(this.props.theme, this.props.checked);
    }

    private get radioIcon() {
        if (this.props.checked) {
            return 'check-box';
        } else {
            return 'check-box-outline-blank';
        }
    }
}
