import * as React from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

interface IProps {
    url: string;
    alt?: string;
    style?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
}

export class Svg extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <WebView
                source={{ html: this.html }}
                scalesPageToFit={true}
                scrollEnabled={false}
                style={[
                    {

                        flex: 1,
                        alignSelf: 'stretch',
                        backgroundColor: 'transparent',
                    },
                    this.props.style
                ]}
            />
        );
    }

    private get html() {
        return (
            `<html>
            <head>
                <meta charset="UTF-8">
                <meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0,shrink-to-fit=no" name="viewport">
            </head>
            <body style="margin: 0;">
                <img src="${this.src}" alt="${this.alt}" />
            </body>
            </html>`
        );
    }

    private get src() {
        if (this.props.url) {
            let url = this.props.url.replace('"', '\'');
            if (Platform.OS === 'android') {
                return encodeURI(url);
            }
            return url;
        }
        return '';
    }

    private get alt() {
        if (this.props.alt) {
            return this.props.alt.replace('"', '\'');
        }
        return 'Image';
    }
}
