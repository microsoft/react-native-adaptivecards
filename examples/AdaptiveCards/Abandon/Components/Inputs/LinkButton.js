import * as React from 'react';
import { TextBlock } from '../Basic/TextBlock';
import { Column } from '../Containers/Column';
export class LinkButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(Column, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', height: 'auto' },
            React.createElement(TextBlock, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, width: 'stretch', fontSize: 16, fontWeight: 'normal', color: '#277BDF', backgroundColor: 'transparent', textAlign: this.props.textAlign, wrap: this.props.wrap, vSpacing: this.props.vSpacing, numberOfLines: this.props.numberOfLines, onPress: this.props.onPress }, this.props.title)));
    }
}
