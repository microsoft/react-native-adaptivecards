import React from 'react';
import { Text, } from 'react-native';
import { FlexBox } from './FlexBox';
export class TextBlock extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onLayout = (width, height) => {
            this.setState({ containerWidth: width });
        };
        this.state = {
            width: 'stretch',
            containerWidth: 0,
        };
    }
    componentDidUpdate() {
        if (this.state.containerWidth === 0) {
            let fontSize = this.props.fontSize || 14;
            let width = 0;
            if (this.props.children && typeof this.props.children === 'string') {
                width = this.props.children.length * fontSize;
            }
            this.setState({
                width: width,
            });
        }
        else {
            if (this.props.width === 'auto' || this.props.width === 'stretch') {
                this.setState({
                    width: this.state.width
                });
            }
            if (typeof this.state.width === 'number' && this.state.containerWidth <= this.state.width) {
                this.setState({
                    width: this.state.containerWidth
                });
            }
        }
    }
    render() {
        return (React.createElement(FlexBox, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, flexDirection: 'column', relativeWidth: false, width: 'stretch', vSpacing: this.props.vSpacing, hSpacing: this.props.hSpacing, alignSelf: 'stretch', alignItems: 'stretch', alignContent: 'stretch', justifyContent: 'flex-start', onPress: this.props.onPress, style: [
                {
                    backgroundColor: this.props.backgroundColor,
                },
                this.props.boxStyle
            ], onLayoutChange: this.onLayout },
            React.createElement(Text, { style: [
                    {
                        color: this.props.color,
                        fontFamily: this.props.fontFamily,
                        fontSize: this.props.fontSize,
                        fontWeight: this.props.fontWeight,
                        flexWrap: this.props.wrap,
                        backgroundColor: this.props.backgroundColor,
                        textAlign: this.props.textAlign,
                    },
                    this.props.textStyle,
                ], numberOfLines: this.props.numberOfLines, onPress: this.props.onPress }, this.props.children)));
    }
}
