import React from 'react';
import {
    PixelRatio,
    Platform,
    View,
} from 'react-native';

interface IProps {
    isHorizontal?: boolean;
    margin?: number;
    color?: string;
}

export class SeparateLine extends React.PureComponent<IProps, any> {
    static defaultProps = {
        isHorizontal: false,
        margin: 0,
        color: 'lightgray',
    };

    render(): React.ReactElement<any> {
        const { color, isHorizontal, margin } = this.props;
        /**
         * Line with 1 dp looks thick on iOS, divide by 'device pixel density' to get 1 pixel line
         */
        const thickness: number = (Platform.OS === 'ios') ?
            parseFloat((1 / PixelRatio.get()).toFixed(2)) :
            1;

        const style = isHorizontal ?
            {
                width: thickness,
                marginLeft: margin,
                marginRight: margin,
                marginTop: 0,
                marginBottom: 0,
            } :
            {
                height: thickness,
                marginLeft: 0,
                marginRight: 0,
                marginTop: margin,
                marginBottom: margin,
            };

        return (
            <View
                {...this.props}
                style={[
                    {
                        flex: 1,
                        backgroundColor: color,
                    },
                    style]
                }
            />
        );
    }
}
