import React from 'react';
import {
    PixelRatio,
    Platform,
    View,
} from 'react-native';

interface IProps {
    margin?: number;
    color?: string;
}

export class SeparateLine extends React.PureComponent<IProps, any> {
    public render() {
        const { color, margin } = this.props;
        /**
         * Line with 1 dp looks thick on iOS, divide by 'device pixel density' to get 1 pixel line
         */
        const thickness = (Platform.OS === 'ios') ?
            parseFloat((1 / PixelRatio.get()).toFixed(2)) :
            1;

        const style = {
            height: thickness,
            marginHorizontal: 0,
            marginVertical: margin
        };

        return (
            <View
                {...this.props}
                style={[
                    {
                        flex: 0,
                        backgroundColor: color,
                    },
                    style
                ]}
            />
        );
    }
}
