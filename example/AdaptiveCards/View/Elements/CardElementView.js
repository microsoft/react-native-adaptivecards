import React from 'react';
import { CardElementType } from '../../Schema/Elements/CardElementType';
import { ColumnSetView } from '../Containers/ColumnSetView';
import { ColumnView } from '../Containers/ColumnView';
import { ContainerView } from '../Containers/ContainerView';
import { FactSetView } from '../Containers/FactSetView';
import { ImageSetView } from '../Containers/ImageSetView';
import { DateInputView } from '../Inputs/DateInputView';
import { TextInputView } from '../Inputs/TextInputView';
import { TimeInputView } from '../Inputs/TimeInputView';
import { ImageView } from './ImageView';
import { TextBlockView } from './TextBlockView';
export class CardElementView extends React.PureComponent {
    render() {
        const { cardElement, index, containerWidth } = this.props;
        if (!cardElement || !cardElement.isValid()) {
            return null;
        }
        switch (cardElement.type) {
            case CardElementType.TextBlock:
                return (React.createElement(TextBlockView, { textBlock: cardElement, index: index }));
            case CardElementType.Image:
                return (React.createElement(ImageView, { image: cardElement, index: index }));
            case CardElementType.ImageSet:
                return (React.createElement(ImageSetView, { imageSet: cardElement, index: index }));
            case CardElementType.Container:
                return (React.createElement(ContainerView, { container: cardElement, index: index }));
            case CardElementType.Column:
                return (React.createElement(ColumnView, { column: cardElement, containerWidth: containerWidth, index: index }));
            case CardElementType.ColumnSet:
                return (React.createElement(ColumnSetView, { columnSet: cardElement, index: index }));
            case CardElementType.FactSet:
                return (React.createElement(FactSetView, { factSet: cardElement, index: index }));
            case CardElementType.InputText:
                return (React.createElement(TextInputView, { inputFieldId: cardElement.id, containerId: this.props.containerId, inputText: cardElement, index: index }));
            case CardElementType.DateInput:
                return (React.createElement(DateInputView, { inputFieldId: cardElement.id, containerId: this.props.containerId, inputDate: cardElement, index: index }));
            case CardElementType.TimeInput:
                return (React.createElement(TimeInputView, { inputFieldId: cardElement.id, containerId: this.props.containerId, inputTime: cardElement, index: index }));
            default:
                return null;
        }
    }
}
