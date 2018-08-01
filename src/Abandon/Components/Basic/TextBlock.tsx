import React from 'react';
import {
    Text,
} from 'react-native';

interface IProps {
    vIndex: number;
    hIndex: number;
    vSpacing?: number;
    hSpacing?: number;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    wrap?: 'wrap' | 'nowrap';
    horizontalAlign?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    width: 'auto' | 'stretch';
    onPress?: () => void;
    numberOfLines?: number;
    boxStyle?: any;
    textStyle?: any;
    containerWidth?: number;
    containerHeight?: number;
}

interface IState {
}

export class TextBlock extends React.PureComponent<IProps, IState> {
    public render() {
        return (
            <Text
                style={[
                    {
                        color: this.props.color,
                        fontFamily: this.props.fontFamily,
                        fontSize: this.props.fontSize,
                        fontWeight: this.props.fontWeight,
                        flexWrap: this.props.wrap,
                        backgroundColor: this.props.backgroundColor,
                        textAlign: this.props.textAlign,
                    },
                    this.props.textStyle,
                ]}
                numberOfLines={this.props.numberOfLines}
                onPress={this.props.onPress}
            >
                {this.props.children}
            </Text>
        );
    }
}
