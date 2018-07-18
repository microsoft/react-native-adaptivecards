import React from 'react';
import { Text, } from 'react-native';
import { FlexBox } from './FlexBox';
export class TextBlock extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(FlexBox, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, flexDirection: 'row', relativeWidth: false, width: this.props.width, vSpacing: this.props.spacing, alignSelf: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyContent: this.props.horizontalAlign, style: [
                {
                    backgroundColor: this.props.backgroundColor
                },
                this.props.boxStyle
            ] },
            React.createElement(Text, { style: [
                    {
                        color: this.props.color,
                        fontFamily: this.props.fontFamily,
                        fontSize: this.props.fontSize,
                        fontWeight: this.props.fontWeight,
                        textAlign: this.props.textAlign,
                        flexWrap: this.props.wrap,
                        backgroundColor: this.props.backgroundColor,
                    },
                    this.props.textStyle,
                ], numberOfLines: this.props.numberOfLines }, this.props.children)));
    }
}
