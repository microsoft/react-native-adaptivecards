import React from 'react';
import {
    Text,
} from 'react-native';
import { FlexBox } from './FlexBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    spacing?: number;
    horizontalAlign?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    width: 'auto' | 'stretch';
    numberOfLines?: number;
    boxStyle?: any;
    textStyle?: any;
}

export class TextBlock extends React.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <FlexBox
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                flexDirection='row'
                relativeWidth={false}
                width={this.props.width}
                vSpace={this.props.spacing}
                alignSelf='stretch'
                alignItems='stretch'
                alignContent='stretch'
                justifyContent={this.props.horizontalAlign}
                style={this.props.boxStyle}
            >
                <Text
                    style={[
                        this.props.textStyle,
                    ]}
                    numberOfLines={this.props.numberOfLines}
                >
                    {this.props.children}
                </Text>
            </FlexBox>
        );
    }
}
