import * as React from 'react';
import { FlexBox } from '../Basic/FlexBox';
export class Row extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(FlexBox, { flexDirection: 'row', relativeWidth: false, alignItems: 'stretch', alignContent: 'flex-start', alignSelf: this.props.width !== 'stretch' ? 'auto' : 'stretch', wrap: this.props.wrap, justifyContent: 'flex-start', size: this.props.height ? this.props.height : 'stretch', vIndex: this.props.vIndex, hIndex: this.props.hIndex, style: [this.props.style, this.alignItems], vSpacing: this.props.spacing, onPress: this.props.onPress }, this.props.children));
    }
    get alignItems() {
        if (this.props.width === undefined || this.props.width === 'auto') {
            return {
                alignItems: 'flex-start'
            };
        }
        if (this.props.width === 'stretch') {
            return {
                alignItems: 'stretch'
            };
        }
        return {
            width: this.props.width
        };
    }
}
