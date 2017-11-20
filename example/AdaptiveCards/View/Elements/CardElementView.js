import React from 'react';
import CardElementType from '../../Schema/Elements/CardElementType';
import TextBlockView from './TextBlockView';
import ImageView from './ImageView';
import ImageSetView from '../Containers/ImageSetView';
import FactSetView from '../Containers/FactSetView';
import ColumnView from '../Containers/ColumnView';
import ColumnSetView from '../Containers/ColumnSetView';
import ContainerView from '../Containers/ContainerView';
import InputTextView from '../Inputs/InputTextView';
import InputDateView from '../Inputs/InputDateView';
import InputTimeView from '../Inputs/InputTimeView';
export default class CardElementView extends React.PureComponent {
    render() {
        const { cardElement, index, containerWidth } = this.props;
        if (!cardElement || !cardElement.isValid()) {
            return null;
        }
        switch (cardElement.type) {
            case CardElementType.TextBlock:
                return React.createElement(TextBlockView, { textBlock: cardElement, index: index });
            case CardElementType.Image:
                return React.createElement(ImageView, { image: cardElement, index: index });
            case CardElementType.ImageSet:
                return React.createElement(ImageSetView, { imageSet: cardElement, index: index });
            case CardElementType.Container:
                return React.createElement(ContainerView, { container: cardElement, index: index });
            case CardElementType.Column:
                return React.createElement(ColumnView, { column: cardElement, containerWidth: containerWidth, index: index });
            case CardElementType.ColumnSet:
                return React.createElement(ColumnSetView, { columnSet: cardElement, index: index });
            case CardElementType.FactSet:
                return React.createElement(FactSetView, { factSet: cardElement, index: index });
            case CardElementType.InputText:
                return React.createElement(InputTextView, { inputText: cardElement, index: index });
            case CardElementType.InputDate:
                return React.createElement(InputDateView, { inputDate: cardElement, index: index });
            case CardElementType.InputTime:
                return React.createElement(InputTimeView, { inputTime: cardElement, index: index });
            default:
                return null;
        }
    }
}
