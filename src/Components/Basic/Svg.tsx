import * as React from 'react';
import { StyleProp, ViewStyle, WebView } from 'react-native';

interface IProps {
    url: string;
    alt: string;
    style?: StyleProp<ViewStyle>;
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
                style={this.props.style}
            />
        );
    }

    private get html() {
        return (
            `<html>
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
            </html>`
        );
    }

    private get src() {
        if (this.props.url) {
            return this.props.url.replace('"', '\'');
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
