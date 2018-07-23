import * as React from 'react';
import { FlexBox } from '../Basic/FlexBox';
export class Column extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(FlexBox, { flexDirection: 'column', relativeWidth: true, alignSelf: 'stretch', alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', width: this.props.width, vIndex: this.props.vIndex, hIndex: this.props.hIndex, style: this.props.style, vSpacing: this.props.spacing, onPress: this.props.onPress }, this.renderChildren()));
    }
    renderChildren() {
        if (this.props.children) {
            return React.Children.map(this.props.children, (child) => {
                if (child) {
                    if (typeof child !== 'string' && typeof child !== 'number') {
                        return React.cloneElement(child, {
                            flex: 0
                        });
                    }
                }
                return child;
            });
        }
        return undefined;
    }
}
