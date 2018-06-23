import * as React from 'react';
import { View } from 'react-native';
export class FlexBox extends React.Component {
    constructor(props) {
        super(props);
        this.getFlex = () => {
            if (this.props.size === 'stretch') {
                return {
                    flex: 1,
                };
            }
            if (this.props.size === 'auto') {
                return {
                    flex: 0,
                };
            }
            return {
                width: this.props.size
            };
        };
        this.getMargin = () => {
            if (this.props.index > 0 && this.props.spacing) {
                return {
                    marginTop: this.props.spacing
                };
            }
            return {};
        };
    }
    render() {
        return (React.createElement(View, { style: [
                this.getFlex(),
                this.getMargin(),
                {
                    alignSelf: this.props.align,
                }
            ], onLayout: this.props.onLayout }, this.props.children));
    }
}
