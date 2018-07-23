import * as React from 'react';
import { TextBlock } from '../Basic/TextBlock';

interface IProps {
    vIndex: number;
    hIndex: number;
    vSpacing?: number;
    hSpacing?: number;
    title: string;
    textAlign: 'auto' | 'left' | 'right' | 'center' | 'justify';
    wrap: 'wrap' | 'nowrap';
    numberOfLines: number;
    onPress?: () => void;
}

export class LinkButton extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <TextBlock
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                width='stretch'
                fontSize={16}
                fontWeight={'normal'}
                color={'#277BDF'}
                backgroundColor='transparent'
                textAlign={this.props.textAlign}
                wrap={this.props.wrap}
                vSpacing={this.props.vSpacing}
                numberOfLines={this.props.numberOfLines}
                onPress={this.props.onPress}
            >
                {this.props.title}
            </TextBlock>
        );
    }
}
