import * as React from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { ISelectable } from '../../Shared/Types';
import { StyleConfig } from '../../Styles/StyleConfig';

export interface IRadio<T> extends ISelectable<T> {
    activated: boolean;
}

interface IProps<T> extends IRadio<T> {
    theme: 'default' | 'emphasis';
    onActive: (value: T) => void;
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
        console.log('RadioBox clicked');
        if (this.props.onActive) {
            this.props.onActive(this.props.value);
        }
    }

    private get color() {
        return StyleConfig.getCheckboxTitleColor(this.props.theme);
    }

    private get radioColor() {
        return StyleConfig.getCheckboxBoxColor(this.props.theme, this.props.activated);
    }

    private get radioIcon() {
        if (this.props.activated) {
            return 'radio-button-checked';
        } else {
            return 'radio-button-unchecked';
        }
    }
}
