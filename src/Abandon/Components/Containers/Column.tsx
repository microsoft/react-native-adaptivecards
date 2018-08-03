import * as React from 'react';
import { FlexBox } from '../Basic/FlexBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    height: 'auto' | 'stretch' | number;
    width: 'auto' | 'stretch' | number;
    vSpacing?: number;
    hSpacing?: number;
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
                alignItems='stretch'
                alignContent='flex-start'
                alignSelf={this.props.height !== 'stretch' ? 'auto' : 'stretch'}
                justifyContent='flex-start'
                size={this.props.width}
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                style={[this.props.style, this.alignSelf]}
                vSpacing={this.props.vSpacing}
                hSpacing={this.props.hSpacing}
                onPress={this.props.onPress}
            >
                {this.props.children}
            </FlexBox>
        );
    }

    private get alignSelf() {
        if (this.props.height === undefined || this.props.height === 'auto') {
            return {
                alignSelf: 'flex-start'
            };
        }
        if (this.props.height === 'stretch') {
            return {
                alignSelf: 'stretch'
            };
        }
        return {
            height: this.props.height
        };
    }
}
