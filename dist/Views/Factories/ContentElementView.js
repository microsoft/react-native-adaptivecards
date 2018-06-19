import * as React from 'react';
import { ContentElementType } from '../../Schema/Base/ContentElement';
import { SeparateLine } from '../Basic/SeparateLine';
import { TextBlockView } from '../CardElements/TextBlockView';
import { FactSetView } from '../Containers/FactSetView';
import { ImageSetView } from '../Containers/ImageSetView';
import { DecStyleManager } from '../Styles/DecStyleManager';
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
                return (React.createElement(FormElementView, { key: 'form' + this.props.index, index: this.props.index, element: this.props.element }));
            }
            else if (this.props.element.isInput()) {
                return (React.createElement(InputElementView, { key: 'input' + this.props.index, index: this.props.index, element: this.props.element }));
            }
            else {
                switch (this.props.element.type) {
                    case ContentElementType.TextBlock:
                        return (React.createElement(TextBlockView, { key: 'text' + this.props.index, element: this.props.element, index: this.props.index }));
                    case ContentElementType.ImageSet:
                        return (React.createElement(ImageSetView, { key: 'img' + this.props.index, element: this.props.element, index: this.props.index }));
                    case ContentElementType.FactSet:
                        return (React.createElement(FactSetView, { key: 'fact' + this.props.index, element: this.props.element, index: this.props.index }));
                    default:
                        return null;
                }
                return null;
            }
        }
        return null;
    }
    renderSeperator() {
        if (this.props.element.separator && this.props.index !== 0) {
            return (React.createElement(SeparateLine, { key: 'seperator' + this.props.index, isHorizontal: DecStyleManager.getInstance().isHorizontalCardElement(this.props.element.type), margin: DecStyleManager.getInstance().getCardElementMargin(this.props.element.spacing), color: DecStyleManager.getInstance().getStyle().element.separateLineColor }));
        }
    }
}
