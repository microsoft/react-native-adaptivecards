import * as React from 'react';
import { Text, View } from 'react-native';
export class Banner extends React.Component {
    render() {
        return (React.createElement(View, { backgroundColor: this.props.backgroundColor, paddingTop: 8, paddingRight: 8, paddingBottom: 8, paddingLeft: 8, marginTop: 4, marginRight: 4, marginBottom: 4, marginLeft: 4 },
            React.createElement(Text, { style: {
                    color: this.props.color,
                } }, this.props.title),
            this.props.children));
    }
}
