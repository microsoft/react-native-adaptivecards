import React from 'react';
import { PixelRatio, Platform, View, } from 'react-native';
export class SeparateLine extends React.PureComponent {
    render() {
        const { color, isHorizontal, margin } = this.props;
        const thickness = (Platform.OS === 'ios') ?
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
        return React.createElement(View, Object.assign({}, this.props, { style: [{
                    flex: 1,
                    backgroundColor: color,
                }, style] }));
    }
}
SeparateLine.defaultProps = {
    isHorizontal: false,
    margin: 0,
    color: 'lightgray',
};
