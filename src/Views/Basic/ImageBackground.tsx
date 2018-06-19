import React from 'react';
import {
    Image,
    ImageProperties,
    ImageStyle,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

interface IProps extends ImageProperties {
    containerStyle?: ViewStyle;
    imageStyle?: ImageStyle;
}
interface IState {
}

export class ImageBackground extends React.PureComponent<IProps, IState> {
    public render() {
        const { children, containerStyle, imageStyle, source } = this.props;

        return (
            <View
                style={[
                    containerStyle,
                    {
                        position: 'relative',
                    }
                ]}
            >
                <Image
                    source={source}
                    style={[
                        StyleSheet.absoluteFill,
                        imageStyle,
                    ]}
                />
                {children}
            </View>
        );
    }
}
