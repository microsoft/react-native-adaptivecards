import * as React from 'react';
import { View } from 'react-native';
export class FlexContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(View, { style: [
                this.getFlex(),
                this.props.style
            ] }, this.props.children));
    }
    getFlex() {
        let result = {
            flexDirection: this.props.direction,
            alignItems: 'stretch',
            justifyContent: 'space-between',
        };
        return result;
    }
}
