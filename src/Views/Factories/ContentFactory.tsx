import * as React from 'react';
import { View } from 'react-native';
import { ContentElement, ContentElementType } from '../../Schema/Base/ContentElement';
import { FormElement } from '../../Schema/Base/FormElement';
import { InputElement } from '../../Schema/Base/InputElement';
import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { SeparateLine } from '../Basic/SeparateLine';
import { TextBlockView } from '../CardElements/TextBlockView';
import { FactSetView } from '../Containers/FactSetView';
import { ImageSetView } from '../Containers/ImageSetView';
import { DecStyleManager } from '../Styles/DecStyleManager';
import { FormFactory } from './FormFactory';
import { InputFactory } from './InputFactory';

export class ContentFactory {

    public static createComponents(element: ContentElement, index: number) {
        return [
            ContentFactory.createSeparator(element, index),
            ContentFactory.createElement(element, index)
        ];
    }

    public static createView(element: ContentElement, index: number, stretch: boolean) {
        return (
            <View
                style={stretch ? { flex: 1 } : {}}
                key={element.getTypeName() + element.getId() + index}
            >
                {ContentFactory.createSeparator(element, index)}
                {ContentFactory.createElement(element, index)}
            </View>
        );
    }

    private static createElement(element: ContentElement, index: number) {
        if (element) {
            if (element.isForm()) {
                return FormFactory.createView(element as FormElement, index);
            } else if (element.isInput()) {
                return InputFactory.createView(element as InputElement, index);
            } else {
                switch (element.type) {
                    case ContentElementType.TextBlock:
                        return (
                            <TextBlockView
                                key={'text' + index}
                                element={element as TextBlockElement}
                                index={index}
                            />
                        );
                    case ContentElementType.ImageSet:
                        return (
                            <ImageSetView
                                key={'img' + index}
                                element={element as ImageSetElement}
                                index={index}
                            />
                        );
                    case ContentElementType.FactSet:
                        return (
                            <FactSetView
                                key={'fact' + index}
                                element={element as FactSetElement}
                                index={index}
                            />
                        );
                    default:
                        return null;
                }
                return null;
            }
        }
        return null;
    }

    private static createSeparator(element: ContentElement, index: number) {
        if (element.separator && index !== 0) {
            return (
                <SeparateLine
                    key={'separator' + index}
                    isHorizontal={DecStyleManager.getInstance().isHorizontalCardElement(element.type)}
                    margin={DecStyleManager.getInstance().getCardElementMargin(element.spacing)}
                    color={DecStyleManager.getInstance().getStyle().element.separateLineColor}
                />
            );
        }
    }
}
