import * as React from 'react';
import { FlexBox } from '../Basic/FlexBox';
export class Column extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(FlexBox, { flexDirection: 'column', relativeWidth: true, alignSelf: 'stretch', alignContent: 'stretch', alignItems: 'stretch', justifyContent: 'flex-start', width: this.props.width, vIndex: this.props.vIndex, hIndex: this.props.hIndex, style: this.props.style, vSpacing: this.props.spacing, onPress: this.props.onPress }, this.props.children));
    }
}
