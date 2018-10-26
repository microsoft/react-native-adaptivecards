import React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    height?: number;
    noMargin?: boolean;
}

export class SeparateLine extends React.PureComponent<IProps> {
    public render() {
        return (
            <View style={{
                backgroundColor: StyleManager.separatorColor,
                height: StyleManager.separatorThickness,
                marginTop: this.margin,
                marginBottom: this.margin,
            }}
            />
        );
    }

    private get margin() {
        if (this.props.noMargin) {
            return 0;
        }
        if (this.props.height && this.props.height > 0) {
            return this.props.height / 2;
        } else {
            return StyleManager.separatorSpacing;
        }
    }
}
