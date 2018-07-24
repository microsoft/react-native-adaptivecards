import * as React from 'react';
import { FlexBox } from '../Basic/FlexBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    width: 'auto' | 'stretch' | number;
    spacing?: number;
    style?: any;
    onPress?: () => void;
}

export class Column extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <FlexBox
                flexDirection='column'
                relativeWidth={true}
                alignSelf='stretch'
                alignContent='stretch'
                alignItems='stretch'
                justifyContent='flex-start'
                width={this.props.width}
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
