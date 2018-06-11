import React from 'react';

import { ColumnElement } from '../../Schema/Containers/Column';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { ContainerElement } from '../../Schema/Containers/Container';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { CardElement } from '../../Schema/Elements/CardElement';
import { CardElementType } from '../../Schema/Elements/CardElementType';
import { ImageElement } from '../../Schema/Elements/Image';
import { TextBlockElement } from '../../Schema/Elements/TextBlock';
import { DateInputElement } from '../../Schema/Inputs/DateInput';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { TimeInputElement } from '../../Schema/Inputs/TimeInput';

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

interface IProps {
    id?: string;
    containerId?: string;
    cardElement: CardElement;
    index?: number;
    containerWidth?: number;
}
interface IState {
}

export class CardElementView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { cardElement, index, containerWidth } = this.props;

        if (!cardElement || !cardElement.isValid()) {
            return null;
        }

        switch (cardElement.type) {
            case CardElementType.TextBlock:
                return (
                    <TextBlockView
                        textBlock={cardElement as TextBlockElement}
                        index={index} />
                );
            case CardElementType.Image:
                return (
                    <ImageView
                        image={cardElement as ImageElement}
                        index={index}
                    />
                );
            case CardElementType.ImageSet:
                return (
                    <ImageSetView
                        imageSet={cardElement as ImageSetElement}
                        index={index}
                    />
                );
            case CardElementType.Container:
                return (
                    <ContainerView
                        container={cardElement as ContainerElement}
                        index={index}
                    />
                );
            case CardElementType.Column:
                return (
                    <ColumnView
                        column={cardElement as ColumnElement}
                        containerWidth={containerWidth}
                        index={index}
                    />
                );
            case CardElementType.ColumnSet:
                return (
                    <ColumnSetView
                        columnSet={cardElement as ColumnSetElement}
                        index={index}
                    />
                );
            case CardElementType.FactSet:
                return (
                    <FactSetView
                        factSet={cardElement as FactSetElement}
                        index={index}
                    />
                );
            case CardElementType.InputText:
                return (
                    <TextInputView
                        inputFieldId={cardElement.id}
                        containerId={this.props.containerId}
                        inputText={cardElement as TextInputElement}
                        index={index}
                    />
                );
            case CardElementType.DateInput:
                return (
                    <DateInputView
                        inputFieldId={cardElement.id}
                        containerId={this.props.containerId}
                        inputDate={cardElement as DateInputElement}
                        index={index}
                    />
                );
            case CardElementType.TimeInput:
                return (
                    <TimeInputView
                        inputFieldId={cardElement.id}
                        containerId={this.props.containerId}
                        inputTime={cardElement as TimeInputElement}
                        index={index}
                    />
                );
            default:
                return null;
        }
    }
}
