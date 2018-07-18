import * as React from 'react';
import { ImageBackground } from '../../Components/Basic/ImageBackground';
import { SeparateLine } from '../../Components/Basic/SeparateLine';
import { ContentElementType } from '../../Schema/Base/ContentElement';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
import { TextBlockView } from '../CardElements/TextBlock';
import { ColumnSetView } from '../Containers/ColumnSet';
import { ContainerView } from '../Containers/Container';
import { FactSetView } from '../Containers/FactSet';
import { ImageSetView } from '../Containers/ImageSet';
import { DateInputView } from '../Inputs/DateInput';
import { NumberInputView } from '../Inputs/NumberInput';
import { TextInputView } from '../Inputs/TextInput';
import { TimeInputView } from '../Inputs/TimeInput';
export class ContentFactory {
    static createView(element, index, theme) {
        if (element) {
            let elementView = ContentFactory.createElement(element, index, theme);
            if (index > 0 && element.separator) {
                return [
                    React.createElement(SeparateLine, { key: 'SeparateLine' + index, color: '#777777', margin: StyleManager.getInstance().getSpacing(element.spacing) }),
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
            return (React.createElement(ImageBackground, { containerStyle: { flex: 1 }, source: { uri: background }, vIndex: 0, hIndex: 0 }, node));
        }
        else {
            return null;
        }
    }
    static createElement(element, index, theme) {
        if (element) {
            switch (element.type) {
                case ContentElementType.TextInput:
                    return (React.createElement(TextInputView, { key: 'TextInputView' + index, element: element, vIndex: index, hIndex: 0, theme: theme }));
                case ContentElementType.NumberInput:
                    return (React.createElement(NumberInputView, { key: 'NumberInputView' + index, element: element, vIndex: index, hIndex: 0, theme: theme }));
                case ContentElementType.DateInput:
                    return (React.createElement(DateInputView, { key: 'DateInputView' + index, element: element, vIndex: index, hIndex: 0, theme: theme }));
                case ContentElementType.TimeInput:
                    return (React.createElement(TimeInputView, { key: 'TimeInputView' + index, element: element, vIndex: index, hIndex: 0, theme: theme }));
                case ContentElementType.Container:
                    return (React.createElement(ContainerView, { key: 'ContainerView' + index, element: element, vIndex: index, hIndex: 0, theme: theme }));
                case ContentElementType.ColumnSet:
                    return (React.createElement(ColumnSetView, { key: 'ColumnSetView' + index, element: element, vIndex: index, hIndex: 0, theme: theme }));
                case ContentElementType.TextBlock:
                    return (React.createElement(TextBlockView, { key: 'TextBlockView' + index, element: element, vIndex: index, hIndex: 0, theme: theme }));
                case ContentElementType.Image:
                    return (React.createElement(ImageView, { key: 'ImageView' + index, element: element, vIndex: index, hIndex: 0 }));
                case ContentElementType.ImageSet:
                    return (React.createElement(ImageSetView, { key: 'ImageSetView' + index, element: element, vIndex: index, hIndex: 0, theme: theme }));
                case ContentElementType.FactSet:
                    return (React.createElement(FactSetView, { key: 'FactSetView' + index, element: element, vIndex: index, hIndex: 0, theme: theme }));
                default:
                    return null;
            }
        }
        return null;
    }
}
