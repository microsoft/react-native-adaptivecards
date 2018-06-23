import * as React from 'react';
import {
    LayoutChangeEvent,
    View
} from 'react-native';

interface IProps {
    size: 'stretch' | 'auto' | number;
    spacing?: number;
    index: number;
    align: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    onLayout?: (event?: LayoutChangeEvent) => void;
}

export class FlexBox extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <View
                style={[
                    this.getFlex(),
                    this.getMargin(),
                    {
                        alignSelf: this.props.align,
                    }
                ]}
                onLayout={this.props.onLayout}
            >
                {this.props.children}
            </View>
        );
    }

    private getFlex = () => {
        if (this.props.size === 'stretch') {
            return {
                flex: 1,
            };
        }
        if (this.props.size === 'auto') {
            return {
                flex: 0,
            };
        }
        return {
            width: this.props.size
        };
    }

    private getMargin = () => {
        if (this.props.index > 0 && this.props.spacing) {
            return {
                marginTop: this.props.spacing
            };
        }
        return {};
    }
}
