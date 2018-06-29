import React from 'react';
import { Text, } from 'react-native';
import { FlexBox } from './FlexBox';
export class TextBlock extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(FlexBox, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, flexDirection: 'row', relativeWidth: false, width: this.props.width, vSpace: this.props.spacing, alignSelf: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyContent: this.props.horizontalAlign, style: this.props.boxStyle },
            React.createElement(Text, { style: [
                    this.props.textStyle,
                ], numberOfLines: this.props.numberOfLines }, this.props.children)));
    }
}
