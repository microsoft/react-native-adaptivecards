import * as React from 'react';
import { Text } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    remains: number;
    theme: 'default' | 'emphasis';
    marginTop?: number;
}

export class CountDown extends React.Component<IProps> {
    public render() {
        const { remains, theme, marginTop } = this.props;
        if (remains >= 0) {
            return (
                <Text
                    style={{
                        color: StyleManager.getColor('default', theme, false),
                        fontSize: StyleManager.getFontSize('extraLarge'),
                        fontWeight: StyleManager.getFontWeight('default'),
                        backgroundColor: 'transparent',
                        textAlign: StyleManager.getTextAlign('center'),
                        flexWrap: StyleManager.getWrap(false),
                        marginTop: marginTop
                    }}
                >
                    {remains}
                </Text>
            );
        }
        return null;
    }
}
