import React from 'react';
import {
    Image,
    ImageStyle,
    ImageProperties,
    View,
    ViewStyle,
    StyleSheet,
} from 'react-native';

interface IProps extends ImageProperties {
    containerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
}
interface IState {
}

export default class ImageBackground extends React.PureComponent<IProps, IState> {
    render() {
        const { children, containerStyle, imageStyle, source } = this.props;

        return <View style={[
            containerStyle,
            {
                position: 'relative',
            }
        ]}>
            <Image source={source} style={[
                StyleSheet.absoluteFill,
                imageStyle,
            ]} />
            {children}
        </View>;
    }
}
