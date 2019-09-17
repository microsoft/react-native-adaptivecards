import * as React from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
export class Svg extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(WebView, { source: { html: this.html }, scalesPageToFit: true, scrollEnabled: false, style: [
                {
                    flex: 1,
                    alignSelf: 'stretch',
                    backgroundColor: 'transparent',
                },
                this.props.style
            ] }));
    }
    get html() {
        return (`<html>
            <head>
                <meta charset="UTF-8">
                <meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0,shrink-to-fit=no" name="viewport">
            </head>
            <body style="margin: 0;">
                <img src="${this.src}" alt="${this.alt}" />
            </body>
            </html>`);
    }
    get src() {
        if (this.props.url) {
            let url = this.props.url.replace('"', '\'');
            if (Platform.OS === 'android') {
                return encodeURI(url);
            }
            return url;
        }
        return '';
    }
    get alt() {
        if (this.props.alt) {
            return this.props.alt.replace('"', '\'');
        }
        return 'Image';
    }
}
