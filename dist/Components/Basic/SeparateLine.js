import React from 'react';
import { PixelRatio, Platform, View, } from 'react-native';
export class SeparateLine extends React.PureComponent {
    render() {
        const { color, margin } = this.props;
        const thickness = (Platform.OS === 'ios') ?
            parseFloat((1 / PixelRatio.get()).toFixed(2)) :
            1;
        const style = {
            height: thickness,
            marginHorizontal: 0,
            marginVertical: margin
        };
        return (React.createElement(View, Object.assign({}, this.props, { style: [
                {
                    flex: 0,
                    backgroundColor: color,
                },
                style
            ] })));
    }
}
