import * as React from 'react';
import { Text, View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageBlock } from '../Basic/ImageBlock';
import { Touchable } from '../Basic/Touchable';

interface IProps {
    avatar: string;
    mainInfo: string;
    subInfo: string;
    hiddenFields: any;
    theme: 'default' | 'emphasis';
    onSelect?: (data: any) => void;
}

export class Contact extends React.Component<IProps> {
    public render() {
        if (this.props.onSelect) {
            return this.renderTouchableBlock();
        } else {
            return this.renderNonTouchableBlock();
        }
    }

    private renderTouchableBlock() {
        return (
            <Touchable
                onPress={this.onPress}
                style={{
                    alignSelf: 'stretch',
                    flexDirection: 'row'
                }}
            >
                {this.renderContent()}
            </Touchable>
        );
    }

    private renderNonTouchableBlock() {
        return (
            <View
                style={{
                    alignSelf: 'stretch',
                    flexDirection: 'row'
                }}
            >
                {this.renderContent()}
            </View>
        );
    }

    private renderContent() {
        return [
            <ImageBlock
                url={this.props.avatar}
                mode='avatar'
                width={StyleManager.getImageSize('medium') as number}
                height={StyleManager.getImageSize('medium') as number}
            />,
            <View>
                <Text
                    accessible={true}
                    style={{
                        color: StyleManager.getColor('default', this.props.theme, false),
                        fontSize: StyleManager.getFontSize('default'),
                        fontWeight: StyleManager.getFontWeight('default'),
                        backgroundColor: 'transparent',
                        textAlign: StyleManager.getTextAlign('left'),
                        flexWrap: StyleManager.getWrap(true),
                    }}
                >
                    {this.props.mainInfo}
                </Text>
                <Text
                    accessible={true}
                    style={{
                        color: StyleManager.getColor('default', this.props.theme, true),
                        fontSize: StyleManager.getFontSize('small'),
                        fontWeight: StyleManager.getFontWeight('default'),
                        backgroundColor: 'transparent',
                        textAlign: StyleManager.getTextAlign('left'),
                        flexWrap: StyleManager.getWrap(true),
                    }}
                >
                    {this.props.subInfo}
                </Text>
            </View>
        ];
    }

    private onPress = () => {
        if (this.props.onSelect) {
            this.props.onSelect(this.props.hiddenFields);
        }
    }
}
