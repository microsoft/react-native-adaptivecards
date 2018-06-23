import * as React from 'react';
import { View } from 'react-native';
import { ContentElementType } from '../../Schema/Base/ContentElement';
import { SeparateLine } from '../Basic/SeparateLine';
import { TextBlockView } from '../CardElements/TextBlockView';
import { FactSetView } from '../Containers/FactSetView';
import { ImageSetView } from '../Containers/ImageSetView';
import { DecStyleManager } from '../Styles/DecStyleManager';
import { FormFactory } from './FormFactory';
import { InputFactory } from './InputFactory';
export class ContentFactory {
    static createComponents(element, index) {
        return [
            ContentFactory.createSeparator(element, index),
            ContentFactory.createElement(element, index)
        ];
    }
    static createView(element, index, stretch) {
        return (React.createElement(View, { style: stretch ? { flex: 1 } : {}, key: element.getTypeName() + element.getId() + index },
            ContentFactory.createSeparator(element, index),
            ContentFactory.createElement(element, index)));
    }
    static createElement(element, index) {
        if (element) {
            if (element.isForm()) {
                return FormFactory.createView(element, index);
            }
            else if (element.isInput()) {
                return InputFactory.createView(element, index);
            }
            else {
                switch (element.type) {
                    case ContentElementType.TextBlock:
                        return (React.createElement(TextBlockView, { key: 'text' + index, element: element, index: index }));
                    case ContentElementType.ImageSet:
                        return (React.createElement(ImageSetView, { key: 'img' + index, element: element, index: index }));
                    case ContentElementType.FactSet:
                        return (React.createElement(FactSetView, { key: 'fact' + index, element: element, index: index }));
                    default:
                        return null;
                }
                return null;
            }
        }
        return null;
    }
    static createSeparator(element, index) {
        if (element.separator && index !== 0) {
            return (React.createElement(SeparateLine, { key: 'separator' + index, isHorizontal: DecStyleManager.getInstance().isHorizontalCardElement(element.type), margin: DecStyleManager.getInstance().getCardElementMargin(element.spacing), color: DecStyleManager.getInstance().getStyle().element.separateLineColor }));
        }
    }
}
