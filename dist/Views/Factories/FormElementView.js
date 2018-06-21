import * as React from 'react';
import { FormElementType } from '../../Schema/Base/FormElement';
import { DecImageView } from '../CardElements/DecImageView';
import { CardView } from '../Cards/CardView';
import { ColumnSetView } from '../Containers/ColumnSetView';
import { ColumnView } from '../Containers/ColumnView';
import { ContainerView } from '../Containers/ContainerView';
export class FormElementView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.element) {
            switch (this.props.element.type) {
                case FormElementType.Image:
                    return (React.createElement(DecImageView, { element: this.props.element, index: this.props.index }));
                case FormElementType.Container:
                    return (React.createElement(ContainerView, { element: this.props.element, index: this.props.index }));
                case FormElementType.Column:
                    return (React.createElement(ColumnView, { element: this.props.element, containerWidth: this.props.containerWidth, index: this.props.index }));
                case FormElementType.ColumnSet:
                    return (React.createElement(ColumnSetView, { element: this.props.element, index: this.props.index }));
                case FormElementType.AdaptiveCard:
                    return (React.createElement(CardView, { element: this.props.element, index: this.props.index }));
                default:
                    return null;
            }
        }
        return null;
    }
}
