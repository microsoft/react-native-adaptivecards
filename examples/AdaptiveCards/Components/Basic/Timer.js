import * as React from 'react';
import { Text } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
export class Timer extends React.Component {
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
                } }, this.timeString));
        }
        return null;
    }
    get timeString() {
        return `${this.min}:${this.sec}`;
    }
    get sec() {
        let sec = this.props.remains % 60;
        if (sec < 10) {
            return `0${sec}`;
        }
        return `${sec}`;
    }
    get min() {
        let min = Math.floor(this.props.remains / 60);
        if (min < 10) {
            return `0${min}`;
        }
        return `${min}`;
    }
}
