import * as React from 'react';
import { FlexBox } from '../Basic/FlexBox';
export class Row extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(FlexBox, { flexDirection: 'row', relativeWidth: false, alignSelf: 'stretch', alignContent: 'flex-start', alignItems: 'stretch', wrap: this.props.wrap, justifyContent: 'space-between', width: this.props.width ? this.props.width : 'stretch', vIndex: this.props.vIndex, hIndex: this.props.hIndex, style: this.props.style, vSpace: this.props.spacing, onPress: this.props.onPress }, this.props.children));
    }
}
