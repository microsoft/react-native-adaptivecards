import * as React from 'react';
import {LayoutChangeEvent, Platform, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageBackground } from '../Basic/ImageBackground';

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        ...Platform.select({
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
        }),
    },
});

interface IProps {
    flex?: number;
    fit?: 'content' | 'container';
    theme?: 'default' | 'emphasis';
    backgroundImageUrl?: string;
    onLayout?: (event: LayoutChangeEvent) => void;
    style?: StyleProp<ViewStyle>;
}

export class Card extends React.Component<IProps> {
    public render() {
        return (
            <View
                style={[
                    styles.cardContainer,
                    {
                        flex: this.props.flex,
                    },
                    this.props.style,
                ]}
                onLayout={this.props.onLayout}
            >
                {this.renderCardContent()}
            </View>
        );
    }

    private renderCardContent() {
        if (this.props.backgroundImageUrl) {
            return (
                <ImageBackground
                    url={this.props.backgroundImageUrl}
                    containerStyle={{
                        flex: this.contentFlex,
                        backgroundColor: StyleManager.getBackgroundColor(this.props.theme),
                        borderRadius: 4,
                        overflow: 'hidden',
                    }}
                    imageStyle={{ borderRadius: 4 }}
                >
                    <View
                        style={{ flex: 1, padding: 0, minHeight: 150 }}
                    >
                        {this.props.children}
                    </View>
                </ImageBackground>
            );
        } else {
            return (
                <View
                    style={{
                        flex: this.contentFlex,
                        backgroundColor: StyleManager.getBackgroundColor(this.props.theme),
                        paddingTop: 12,
                        paddingRight: 12,
                        paddingBottom: 12,
                        paddingLeft: 12,
                        borderRadius: 4,
                        overflow: 'hidden'
                    }}
                >
                    {this.props.children}
                </View>
            );
        }
    }

    private get contentFlex() {
        if (this.props.fit === 'container') {
            return 1;
        } else {
            return 0;
        }
    }
}
