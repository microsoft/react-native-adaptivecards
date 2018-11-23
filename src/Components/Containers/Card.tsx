import * as React from 'react';
import { LayoutChangeEvent, Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { HostConfig } from '../../Configs/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { Background } from '../Basic/Background';

interface IProps {
    flex?: number;
    fit?: 'content' | 'container';
    theme?: 'default' | 'emphasis';
    config: HostConfig;
    backgroundImageUrl?: string;
    onLayout?: (event: LayoutChangeEvent) => void;
    style?: StyleProp<ViewStyle>;
}

export class Card extends React.Component<IProps> {
    public render() {
        return (
            <View
                style={[
                    {
                        flex: this.props.flex,
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
                    this.props.style,
                ]}
                onLayout={this.onLayout}
            >
                {this.renderCardContent()}
            </View>
        );
    }

    private renderCardContent() {
        if (this.props.backgroundImageUrl) {
            return (
                <Background
                    url={this.props.backgroundImageUrl}
                    host={this.props.config.baseUrl}
                    containerStyle={{
                        flex: this.contentFlex,
                        backgroundColor: StyleManager.getBackgroundColor(this.props.theme, this.props.config),
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
                </Background>
            );
        } else {
            return (
                <View
                    style={{
                        flex: this.contentFlex,
                        backgroundColor: StyleManager.getBackgroundColor(this.props.theme, this.props.config),
                        padding: 12,
                        borderRadius: 4,
                        overflow: 'hidden'
                    }}
                >
                    {this.props.children}
                </View>
            );
        }
    }

    private onLayout = (event: LayoutChangeEvent) => {
        if (this.props.onLayout) {
            this.props.onLayout(event);
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
