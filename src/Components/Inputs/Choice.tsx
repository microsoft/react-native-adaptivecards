import * as React from 'react';
import { Text } from 'react-native';

import { StyleManager } from '../../Styles/StyleManager';
import { Touchable } from '../Basic/Touchable';

interface IProps<T> {
    title: string;
    value: T;
    selected: boolean;
    onChoose: (value: T) => void;
}

export class Choice<T> extends React.Component<IProps<T>> {
    public render() {
        return (
            <Touchable
                onPress={this.onChoose}
            >
                <Text
                    style={{
                        color: this.color,
                        fontSize: StyleManager.getFontSize('default'),
                        fontWeight: StyleManager.getFontWeight('default'),
                        backgroundColor: this.backgroundColor,
                        textAlign: StyleManager.getTextAlign('left'),
                        flexWrap: StyleManager.getWrap(false),
                    }}
                >
                    {this.props.title}
                </Text>
            </Touchable>
        );
    }

    private onChoose = () => {
        if (this.props.onChoose) {
            this.props.onChoose(this.props.value);
        }
    }

    private get color() {
        if (this.props.selected) {
            return StyleManager.getColor('accent', 'emphasis', true);
        } else {
            return StyleManager.getColor('default', 'default', false);
        }
    }

    private get backgroundColor() {
        if (this.props.selected) {
            return StyleManager.getBackgroundColor('emphasis');
        } else {
            return StyleManager.getBackgroundColor('default');
        }
    }
}
