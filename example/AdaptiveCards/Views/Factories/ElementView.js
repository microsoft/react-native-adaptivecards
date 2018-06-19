import * as React from 'react';
import { ContentElementView } from './ContentElementView';
import { ValueElementView } from './ValueElementView';
export class ElementView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.element) {
            if (this.props.element.isContent()) {
                return (React.createElement(ContentElementView, { index: this.props.index, element: this.props.element }));
            }
            else if (this.props.element.isContent()) {
                return (React.createElement(ValueElementView, { index: this.props.index, element: this.props.element }));
            }
        }
        return null;
    }
}
