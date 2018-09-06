import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageBackground } from '../Basic/ImageBackground';
const styles = StyleSheet.create({
    cardContainer: Object.assign({ backgroundColor: '#fff', borderRadius: 4 }, Platform.select({
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
            borderWidth: 0.4,
            borderColor: 'rgba(0, 0, 0, .1)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 3,
            shadowOpacity: .08,
        }
    })),
});
export class Card extends React.Component {
    render() {
        return (React.createElement(View, { style: [
                styles.cardContainer,
                {
                    flex: this.props.flex,
                },
                this.props.style,
            ], onLayout: this.props.onLayout }, this.renderCardContent()));
    }
    renderCardContent() {
        if (this.props.backgroundImageUrl) {
            return (React.createElement(ImageBackground, { url: this.props.backgroundImageUrl, containerStyle: {
                    flex: this.contentFlex,
                    backgroundColor: StyleManager.getBackgroundColor(this.props.theme),
                    borderRadius: 4,
                    overflow: 'hidden',
                }, imageStyle: { borderRadius: 4 } },
                React.createElement(View, { style: { flex: 1, padding: 0, minHeight: 150 } }, this.props.children)));
        }
        else {
            return (React.createElement(View, { style: {
                    flex: this.contentFlex,
                    backgroundColor: StyleManager.getBackgroundColor(this.props.theme),
                    paddingTop: 12,
                    paddingRight: 12,
                    paddingBottom: 12,
                    paddingLeft: 12,
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
