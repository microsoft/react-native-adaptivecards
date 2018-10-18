import * as React from 'react';
import { Text } from 'react-native';

import { HostConfig } from '../../Configs/Types';
import { IChoice } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { Touchable } from '../Basic/Touchable';

interface IProps<T> extends IChoice<T> {
    index: number;
    config: HostConfig;
    onSelect: (index: number) => void;
}

export class Choice<T> extends React.Component<IProps<T>> {
    public render() {
        return (
            <Touchable
                onPress={this.onChoose}
                style={{
                    paddingTop: StyleManager.getSeparatorSpacing(this.props.config),
                    paddingBottom: StyleManager.getSeparatorSpacing(this.props.config),
                }}
            >
                <Text
                    style={{
                        color: this.color,
                        fontSize: this.fontSize,
                        lineHeight: this.lineHeight,
                        fontWeight: StyleManager.getFontWeight('default', this.props.config),
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
        if (this.props.onSelect) {
            this.props.onSelect(this.props.index);
        }
    }

    private get lineHeight() {
        return this.fontSize * 1.2;
    }

    private get fontSize() {
        return StyleManager.getFontSize('default', this.props.config);
    }

    private get color() {
        if (this.props.selected) {
            return StyleManager.getColor('accent', 'default', false, this.props.config);
        } else {
            return StyleManager.getColor('default', 'default', false, this.props.config);
        }
    }
}
