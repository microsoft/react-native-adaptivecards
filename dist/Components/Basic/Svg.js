import * as React from 'react';
import { WebView } from 'react-native';
export class Svg extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(WebView, { source: { html: this.html }, scalesPageToFit: true, scrollEnabled: false, style: [
                {
                    width: this.props.width,
                    height: this.props.height,
                    maxWidth: this.props.width,
                    maxHeight: this.props.height,
                    backgroundColor: 'transparent',
                },
                this.props.style
            ] }));
    }
    get html() {
        return (`<html>
                <head>
                </head>
                <body 
                    style="margin:0; padding:0; overflow:hidden; background-color: 'transparent'; height:100%; width:100%;"
                >
                    <img src="${this.props.url.replace('"', '\'')}"
                        style="position:fixed; top:0; left:0; background-color: 'transparent'; height:100%; width:100%;"
                    />
                </body>
            </html>`);
    }
}
