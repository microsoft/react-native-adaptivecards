import * as React from 'react';
import { FlexBox } from '../Basic/FlexBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    style?: any;
    spacing?: number;
    width?: number | 'auto' | 'stretch';
    wrap?: 'wrap' | 'nowrap';
    onPress?: () => void;
}

export class Row extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <FlexBox
                flexDirection='row'
                relativeWidth={false}
                alignSelf='stretch'
                alignContent='flex-start'
                alignItems='stretch'
                wrap={this.props.wrap}
                justifyContent='flex-start'
                width={this.props.width ? this.props.width : 'stretch'}
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                style={this.props.style}
                vSpacing={this.props.spacing}
                onPress={this.props.onPress}
            >
                {this.props.children}
            </FlexBox>
        );
    }
}
