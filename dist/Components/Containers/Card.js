import * as React from 'react';
import { Platform, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageBackground } from '../Basic/ImageBackground';
export class Card extends React.Component {
    render() {
        return (React.createElement(View, { flex: this.props.flex, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0, 0, 0, .05)', elevation: 2, paddingTop: 12, paddingRight: 12, paddingBottom: 12, paddingLeft: 12, style: [
                Platform.select({
                    ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 3,
                        shadowOpacity: .08,
                    },
                    android: {
                        elevation: 2,
                    }
                }),
                this.props.style,
            ] }, this.renderCardContent()));
    }
    renderCardContent() {
        if (this.props.backgroundImageUrl) {
            return (React.createElement(ImageBackground, { url: this.props.backgroundImageUrl, containerStyle: {
                    flex: 1,
                    backgroundColor: StyleManager.getBackgroundColor(this.props.theme),
                    borderRadius: 4,
                    overflow: 'hidden',
                }, imageStyle: { borderRadius: 4 } },
                React.createElement(View, { style: { flex: 1, padding: 0, minHeight: 150 } }, this.props.children)));
        }
        else {
            return (React.createElement(View, { flex: 1, backgroundColor: StyleManager.getBackgroundColor(this.props.theme), borderRadius: 4, overflow: 'hidden' },
                this.props.children,
                ";"));
        }
    }
}
