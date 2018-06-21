import * as React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { ImageElement } from '../../Schema/CardElements/Image';
import { ImageStyle } from '../../Shared/Enums';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ImageElement> {

}

export class ImageView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <View>
                {this.renderPlaceholder()}
                {this.renderImg()}
            </View>
        );
    }

    private renderPlaceholder() {
        return (
            <View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                ]}
            >
                <Text
                    style={{
                        fontSize: 32,
                        color: 'rgba(0, 0, 0, 0.5)',
                        textAlign: 'center'
                    }}
                >
                    {'\uE601'}
                </Text>
            </View>
        );
    }

    private renderImg() {
        return (
            <Image
                accessible={!!this.props.element.altText}
                accessibilityLabel={this.props.element.altText || undefined}
                style={[
                    StyleSheet.absoluteFill,
                    {
                        borderRadius: this.decideBorderRadius()
                    }
                ]}
                source={{ uri: this.props.element.url }}
                onLoad={this.onLoad}
                onError={this.onError}
                resizeMode={'cover'}
                resizeMethod={'auto'}
            />
        );
    }

    private onLoad = () => {
        const { element } = this.props;

        Image.getSize(element.url, (width: number, height: number) => {
            console.log('AdaptiveCard Image getSize', width, height);
        }, () => {
            console.error('failed to get image size of commute url, error');
        });
    }

    private onError = () => {
        // TODO: Call back.
        console.error('Failed to load image at URL: ' + this.props.element.url);
    }

    private decideBorderRadius() {
        return this.props.element.style === ImageStyle.Person ? 50 : 0;
    }
}
