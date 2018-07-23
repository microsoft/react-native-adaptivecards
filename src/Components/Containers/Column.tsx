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
                alignContent='flex-start'
                alignItems='flex-start'
                justifyContent='flex-start'
                width={this.props.width}
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                style={this.props.style}
                vSpacing={this.props.spacing}
                onPress={this.props.onPress}
            >
                {this.renderChildren()}
            </FlexBox>
        );
    }

    private renderChildren() {
        if (this.props.children) {
            return React.Children.map(this.props.children, (child) => {
                if (child) {
                    if (typeof child !== 'string' && typeof child !== 'number') {
                        return React.cloneElement(child, {
                            flex: 0
                        });
                    }
                }
                return child;
            });
        }
        return undefined;
    }
}
