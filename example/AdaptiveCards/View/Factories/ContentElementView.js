import * as React from 'react';
import { ContentElementType } from '../../Schema/Base/ContentElement';
import { SeparateLine } from '../Basic/SeparateLine';
import { TextBlockView } from '../CardElements/TextBlockView';
import { FactSetView } from '../Containers/FactSetView';
import { ImageSetView } from '../Containers/ImageSetView';
import { StyleManager } from '../Styles/StyleManager';
import { FormElementView } from './FormElementView';
import { InputElementView } from './InputElementView';
export class ContentElementView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return [
            this.renderSeperator(),
            this.renderELement()
        ];
    }
    renderELement() {
        if (this.props.element) {
            if (this.props.element.isForm()) {
                return (React.createElement(FormElementView, { index: this.props.index, element: this.props.element }));
            }
            else if (this.props.element.isInput()) {
                return (React.createElement(InputElementView, { index: this.props.index, element: this.props.element }));
            }
            else {
                switch (this.props.element.type) {
                    case ContentElementType.TextBlock:
                        return (React.createElement(TextBlockView, { element: this.props.element, index: this.props.index }));
                    case ContentElementType.ImageSet:
                        return (React.createElement(ImageSetView, { element: this.props.element, index: this.props.index }));
                    case ContentElementType.FactSet:
                        return (React.createElement(FactSetView, { element: this.props.element, index: this.props.index }));
                    default:
                        return null;
                }
                return undefined;
            }
        }
        return undefined;
    }
    renderSeperator() {
        if (this.props.element.separator) {
            return (React.createElement(SeparateLine, { isHorizontal: StyleManager.getInstance().isHorizontalCardElement(this.props.element.type), margin: StyleManager.getInstance().getCardElementMargin(this.props.element.spacing), color: StyleManager.getInstance().getStyle().element.separateLineColor }));
        }
    }
}
