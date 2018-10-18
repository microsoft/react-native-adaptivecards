import * as React from 'react';
import { Text } from 'react-native';

import { ISelectable } from '../../Shared/Types';
import { StyleConfig } from '../../Styles/StyleConfig';
import { Touchable } from '../Basic/Touchable';

export interface IChoice<T> extends ISelectable<T> {
    selected: boolean;
}

interface IProps<T> extends IChoice<T> {
    onChoose: (value: T) => void;
}

export class Choice<T> extends React.Component<IProps<T>> {
    public render() {
        return (
            <Touchable
                onPress={this.onChoose}
                style={{
                    paddingTop: StyleConfig.separatorSpacing,
                    paddingBottom: StyleConfig.separatorSpacing,
                }}
            >
                <Text
                    style={{
                        color: this.color,
                        fontSize: StyleConfig.getFontSize('default'),
                        lineHeight: this.lineHeight,
                        fontWeight: StyleConfig.getFontWeight('default'),
                        backgroundColor: this.backgroundColor,
                        textAlign: StyleConfig.getTextAlign('left'),
                        flexWrap: StyleConfig.getWrap(false),
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

    private get lineHeight() {
        return this.fontSize * 1.2;
    }

    private get fontSize() {
        return StyleConfig.getFontSize('default');
    }

    private get color() {
        return StyleConfig.getColor('default', 'default', false);
    }

    private get backgroundColor() {
        if (this.props.selected) {
            return StyleConfig.getColor('accent', 'default', false);
        } else {
            return StyleConfig.getBackgroundColor('default');
        }
    }
}
