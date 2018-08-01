import * as React from 'react';
import { FlexBox } from '../Basic/FlexBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    style?: any;
    spacing?: number;
    width: number | 'auto' | 'stretch';
    height?: number | 'auto' | 'stretch';
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
                alignItems='stretch'
                alignContent='flex-start'
                alignSelf={this.props.width !== 'stretch' ? 'auto' : 'stretch'}
                wrap={this.props.wrap}
                justifyContent='flex-start'
                size={this.props.height ? this.props.height : 'stretch'}
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                style={[this.props.style, this.alignSelf]}
                vSpacing={this.props.spacing}
                onPress={this.props.onPress}
            >
                {this.props.children}
            </FlexBox>
        );
    }

    private get alignSelf() {
        if (this.props.width === undefined || this.props.width === 'auto') {
            return {
                alignSelf: 'flex-start'
            };
        }
        if (this.props.width === 'stretch') {
            return {
                alignSelf: 'stretch'
            };
        }
        return {
            width: this.props.width
        };
    }
}
