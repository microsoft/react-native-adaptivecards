import React from 'react';
import { ContentElementType } from '../../Schema/Base/ContentElement';
import { ImageView } from '../CardElements/ImageView';
import { TextBlockView } from '../CardElements/TextBlockView';
import { ColumnSetView } from '../Containers/ColumnSetView';
import { ColumnView } from '../Containers/ColumnView';
import { ContainerView } from '../Containers/ContainerView';
import { FactSetView } from '../Containers/FactSetView';
import { ImageSetView } from '../Containers/ImageSetView';
import { DateInputView } from '../Inputs/DateInputView';
import { TextInputView } from '../Inputs/TextInputView';
import { TimeInputView } from '../Inputs/TimeInputView';
export class CardElementView extends React.PureComponent {
    render() {
        const { element, index, containerWidth } = this.props;
        if (!element || !element.isValid()) {
            return null;
        }
        switch (element.type) {
            case ContentElementType.TextBlock:
                return (React.createElement(TextBlockView, { element: element, index: index }));
            case ContentElementType.Image:
                return (React.createElement(ImageView, { element: element, index: index }));
            case ContentElementType.ImageSet:
                return (React.createElement(ImageSetView, { element: element, index: index }));
            case ContentElementType.Container:
                return (React.createElement(ContainerView, { element: element, index: index }));
            case ContentElementType.Column:
                return (React.createElement(ColumnView, { element: element, containerWidth: containerWidth, index: index }));
            case ContentElementType.ColumnSet:
                return (React.createElement(ColumnSetView, { element: element, index: index }));
            case ContentElementType.FactSet:
                return (React.createElement(FactSetView, { element: element, index: index }));
            case ContentElementType.InputText:
                return (React.createElement(TextInputView, { element: element, index: index }));
            case ContentElementType.DateInput:
                return (React.createElement(DateInputView, { element: element, index: index }));
            case ContentElementType.TimeInput:
                return (React.createElement(TimeInputView, { element: element, index: index }));
            default:
                return null;
        }
    }
}
