import React from 'react';
import { Text, } from 'react-native';
import { StyleManager } from '../Styles/StyleManager';
export class CardText extends React.PureComponent {
    constructor(props) {
        super(props);
        this.fontFamily = StyleManager.getInstance().getFontFamily();
    }
    render() {
        const { style, children } = this.props;
        return (React.createElement(Text, Object.assign({}, this.props, { style: [
                {
                    fontFamily: this.fontFamily || undefined,
                },
                style
            ] }), children));
    }
}
