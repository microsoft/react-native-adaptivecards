import * as React from 'react';
import { Text } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class CountDown extends React.Component {
    render() {
        const { remains, theme, marginTop } = this.props;
        if (remains >= 0) {
            return (React.createElement(Text, { style: {
                    color: StyleManager.getColor('default', theme, false),
                    fontSize: StyleManager.getFontSize('extraLarge'),
                    fontWeight: StyleManager.getFontWeight('default'),
                    backgroundColor: 'transparent',
                    textAlign: StyleManager.getTextAlign('center'),
                    flexWrap: StyleManager.getWrap(false),
                    marginTop: marginTop
                } }, remains));
        }
        return null;
    }
}
