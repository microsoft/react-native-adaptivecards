import React from 'react';
import { View } from 'react-native';
export class SeparateLine extends React.PureComponent {
    render() {
        return (React.createElement(View, { backgroundColor: this.props.color, height: this.props.thick, marginTop: this.props.marginTop, marginRight: this.props.marginRight, marginBottom: this.props.marginBottom, marginLeft: this.props.marginLeft }));
    }
}
