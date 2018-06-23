import * as React from 'react';
import { View } from 'react-native';

interface IProps {
    direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    style?: any;
}

export class FlexContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <View
                style={[
                    this.getFlex(),
                    this.props.style
                ]}
            >
                {this.props.children}
            </View>
        );
    }

    private getFlex(): {} {
        let result: any = {
            flexDirection: this.props.direction,
            alignItems: 'stretch',
            justifyContent: 'space-between',
        };
        return result;
    }
}
