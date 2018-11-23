import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { Background } from '../Basic/Background';
export class Card extends React.Component {
    constructor() {
        super(...arguments);
        this.onLayout = (event) => {
            if (this.props.onLayout) {
                this.props.onLayout(event);
            }
        };
    }
    render() {
        return (React.createElement(View, { style: [
                Object.assign({ flex: this.props.flex, backgroundColor: '#fff', borderRadius: 4 }, Platform.select({
                    ios: {
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: 'rgba(0, 0, 0, .1)',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 3,
                        shadowOpacity: .08,
                    },
                    android: {
                        elevation: 2,
                    },
                    web: {
                        borderWidth: 0.5,
                        borderColor: 'rgba(0, 0, 0, .1)',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 3,
                        shadowOpacity: .08,
                    }
                })),
                this.props.style,
            ], onLayout: this.onLayout }, this.renderCardContent()));
    }
    renderCardContent() {
        if (this.props.backgroundImageUrl) {
            return (React.createElement(Background, { url: this.props.backgroundImageUrl, host: this.props.config.baseUrl, containerStyle: {
                    flex: this.contentFlex,
                    backgroundColor: StyleManager.getBackgroundColor(this.props.theme, this.props.config),
                    borderRadius: 4,
                    overflow: 'hidden',
                }, imageStyle: { borderRadius: 4 } },
                React.createElement(View, { style: { flex: 1, padding: 0, minHeight: 150 } }, this.props.children)));
        }
        else {
            return (React.createElement(View, { style: {
                    flex: this.contentFlex,
                    backgroundColor: StyleManager.getBackgroundColor(this.props.theme, this.props.config),
                    padding: 12,
                    borderRadius: 4,
                    overflow: 'hidden'
                } }, this.props.children));
        }
    }
    get contentFlex() {
        if (this.props.fit === 'container') {
            return 1;
        }
        else {
            return 0;
        }
    }
}
