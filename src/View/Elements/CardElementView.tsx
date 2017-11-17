import React from 'react';

import CardElement from '../../Schema/Elements/CardElement';
import CardElementType from '../../Schema/Elements/CardElementType';
import Image from '../../Schema/Elements/Image';
import ImageSet from '../../Schema/Containers/ImageSet';
import TextBlock from '../../Schema/Elements/TextBlock';
import FactSet from '../../Schema/Containers/FactSet';
import Column from '../../Schema/Containers/Column';
import ColumnSet from '../../Schema/Containers/ColumnSet';
import Container from '../../Schema/Containers/Container';
import InputText from '../../Schema/Inputs/InputText';
import InputDate from '../../Schema/Inputs/InputDate';
import InputTime from '../../Schema/Inputs/InputTime';

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

interface IProps {
    cardElement: CardElement;
    index?: number;
    containerWidth?: number;
}
interface IState {
}

export default class CardElementView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { cardElement, index, containerWidth } = this.props;

        if (!cardElement || !cardElement.isValid()) {
            return null;
        }

        switch (cardElement.type) {
            case CardElementType.TextBlock:
                return <TextBlockView textBlock={cardElement as TextBlock} index={index} />;
            case CardElementType.Image:
                return <ImageView image={cardElement as Image} index={index} />;
            case CardElementType.ImageSet:
                return <ImageSetView imageSet={cardElement as ImageSet} index={index} />;
            case CardElementType.Container:
                return <ContainerView container={cardElement as Container} index={index} />;
            case CardElementType.Column:
                return <ColumnView column={cardElement as Column} containerWidth={containerWidth} index={index} />;
            case CardElementType.ColumnSet:
                return <ColumnSetView columnSet={cardElement as ColumnSet} index={index} />;
            case CardElementType.FactSet:
                return <FactSetView factSet={cardElement as FactSet} index={index} />;
            case CardElementType.InputText:
                return <InputTextView inputText={cardElement as InputText} index={index} />;
            case CardElementType.InputDate:
                return <InputDateView inputDate={cardElement as InputDate} index={index} />;
            case CardElementType.InputTime:
                return <InputTimeView inputTime={cardElement as InputTime} index={index} />;
            default:
                return null;
        }
    }
}
