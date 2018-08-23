import * as React from 'react';
import { WebView } from 'react-native';
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
                </head>
                <body 
                    style="margin:0; padding:0; overflow:hidden; background-color: 'transparent'; height:100%; width:100%;"
                >
                    <img src="${this.src}"
                        alt="${this.alt}"
                        style="position:fixed; top:0; left:0; background-color: 'transparent'; height:100%; width:100%;"
                    />
                </body>
            </html>`);
    }
    get src() {
        if (this.props.url) {
            return this.props.url.replace('"', '\'');
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
