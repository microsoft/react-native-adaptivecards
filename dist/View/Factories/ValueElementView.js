import * as React from 'react';
import { ValueElementType } from '../../Schema/Base/ValueElement';
import { FactView } from '../Containers/FactView';
export class ValueElementView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.element) {
            switch (this.props.element.type) {
                case ValueElementType.Fact:
                    return (React.createElement(FactView, { element: this.props.element, index: this.props.index }));
                default:
                    return undefined;
            }
        }
        return undefined;
    }
}
