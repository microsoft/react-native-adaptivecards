import * as React from 'react';
import { FormElementType } from '../../Schema/Base/FormElement';
import { ImageView } from '../CardElements/ImageView';
import { CardView } from '../Cards/CardView';
import { ColumnSetView } from '../Containers/ColumnSetView';
import { ColumnView } from '../Containers/ColumnView';
import { ContainerView } from '../Containers/ContainerView';
export class FormFactory {
    static createView(element, index, containerWidth) {
        if (element) {
            switch (element.type) {
                case FormElementType.Image:
                    return (React.createElement(ImageView, { key: 'ImageView' + index, element: element, index: index }));
                case FormElementType.Container:
                    return (React.createElement(ContainerView, { key: 'ContainerView' + index, element: element, index: index }));
                case FormElementType.Column:
                    return (React.createElement(ColumnView, { key: 'ColumnView' + index, element: element, containerWidth: containerWidth, index: index }));
                case FormElementType.ColumnSet:
                    return (React.createElement(ColumnSetView, { key: 'ColumnSetView' + index, element: element, index: index }));
                case FormElementType.AdaptiveCard:
                    return (React.createElement(CardView, { key: 'CardView' + index, element: element, index: index }));
                default:
                    return null;
            }
        }
        return null;
    }
}
