import React from 'react';
import {
    Image,
    ImageStyle,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

interface IProps {
    url: string;
    flex?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    onLoad?: (data: any) => void;
    onError?: (error: any) => void;
}

export class ImageBackground extends React.PureComponent<IProps> {
    public render() {
        return (
            <View style={[{
                flex: this.props.flex,
                position: 'relative',
                marginTop: this.props.marginTop,
                marginRight: this.props.marginRight,
                marginBottom: this.props.marginBottom,
                marginLeft: this.props.marginLeft,
                paddingTop: this.props.paddingTop,
                paddingRight: this.props.paddingRight,
                paddingBottom: this.props.paddingBottom,
                paddingLeft: this.props.paddingLeft
            }, this.props.containerStyle]}

            >
                <Image
                    source={{ uri: this.props.url }}
                    style={[
                        StyleSheet.absoluteFill,
                        this.props.imageStyle
                    ]}
                    onLoad={this.onLoad}
                    onError={this.onError}
                />
                {this.props.children}
            </View>
        );
    }

    private onLoad = (data: any) => {
        if (this.props.onLoad) {
            this.props.onLoad(data);
        }
    }

    private onError = (error: any) => {
        if (this.props.onError) {
            this.props.onError(error);
        }
    }
}
