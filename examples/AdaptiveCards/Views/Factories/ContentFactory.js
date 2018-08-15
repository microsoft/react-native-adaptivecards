import * as React from 'react';
import { ImageBackground } from '../../Components/Basic/ImageBackground';
import { SeparateLine } from '../../Components/Basic/SeparateLine';
import { ContentElementType } from '../../Schema/Abstract/ContentElement';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
import { TextBlockView } from '../CardElements/TextBlock';
import { AdaptiveCardView } from '../Cards/AdaptiveCard';
import { ColumnSetView } from '../Containers/ColumnSet';
import { ContainerView } from '../Containers/Container';
import { FactSetView } from '../Containers/FactSet';
import { ImageSetView } from '../Containers/ImageSet';
import { NumberInputView } from '../Inputs/NumberInput';
import { TextInputView } from '../Inputs/TextInput';
export class ContentFactory {
    static createView(element, index, theme) {
        if (element) {
            let elementView = ContentFactory.createElement(element, index, theme);
            if (index > 0 && element.separator) {
                return [
                    React.createElement(SeparateLine, { key: 'SeparateLine' + index, color: StyleManager.separatorColor, thick: StyleManager.separatorThickness, marginTop: StyleManager.separatorSpacing, marginBottom: StyleManager.separatorSpacing }),
                    elementView
                ];
            }
            return [elementView];
        }
        return null;
    }
    static createBackgroundImageView(node, background) {
        console.log(background);
        if (background) {
            return (React.createElement(ImageBackground, { url: background, flex: 1 }, node));
        }
        else {
            return null;
        }
    }
    static createElement(element, index, theme) {
        if (element) {
            switch (element.type) {
                case ContentElementType.AdaptiveCard:
                    return (React.createElement(AdaptiveCardView, { key: 'TextBlockView' + index, element: element, index: index, theme: theme }));
                case ContentElementType.TextBlock:
                    return (React.createElement(TextBlockView, { key: 'TextBlockView' + index, element: element, index: index, theme: theme }));
                case ContentElementType.Image:
                    return (React.createElement(ImageView, { key: 'ImageView' + index, element: element, index: index }));
                case ContentElementType.Container:
                    return (React.createElement(ContainerView, { key: 'ContainerView' + index, element: element, index: index, theme: theme }));
                case ContentElementType.ColumnSet:
                    return (React.createElement(ColumnSetView, { key: 'ColumnSetView' + index, element: element, index: index, theme: theme }));
                case ContentElementType.FactSet:
                    return (React.createElement(FactSetView, { key: 'FactSetView' + index, element: element, index: index, theme: theme }));
                case ContentElementType.ImageSet:
                    return (React.createElement(ImageSetView, { key: 'ImageSetView' + index, element: element, index: index }));
                case ContentElementType.TextInput:
                    return (React.createElement(TextInputView, { key: 'TextInputView' + index, element: element, index: index, theme: theme }));
                case ContentElementType.NumberInput:
                    return (React.createElement(NumberInputView, { key: 'TextInputView' + index, element: element, index: index, theme: theme }));
                default:
                    return null;
            }
        }
        return null;
    }
}
