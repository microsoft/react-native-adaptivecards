import React from 'react';

import { ContentElementType } from '../../Schema/Base/ContentElement';
import { ImageElement } from '../../Schema/CardElements/Image';
import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { ColumnElement } from '../../Schema/Containers/Column';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { ContainerElement } from '../../Schema/Containers/Container';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { DateInputElement } from '../../Schema/Inputs/DateInput';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { TimeInputElement } from '../../Schema/Inputs/TimeInput';

import { CardElement } from 'Schema/Base/CardElement';
import { NumberInputElement } from 'Schema/Inputs/NumberInput';
import { ImageView } from '../CardElements/ImageView';
import { TextBlockView } from '../CardElements/TextBlockView';
import { ColumnSetView } from '../Containers/ColumnSetView';
import { ColumnView } from '../Containers/ColumnView';
import { ContainerView } from '../Containers/ContainerView';
import { FactSetView } from '../Containers/FactSetView';
import { ImageSetView } from '../Containers/ImageSetView';
import { DateInputView } from '../Inputs/DateInputView';
import { NumberInputView } from '../Inputs/NumberInputView';
import { TextInputView } from '../Inputs/TextInputView';
import { TimeInputView } from '../Inputs/TimeInputView';
import { ICardElementViewProps } from '../Shared/BaseProps';

interface IProps extends ICardElementViewProps<CardElement> {
    id?: string;
    containerWidth?: number;
}
interface IState {
}

export class CardElementView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { element, index, containerWidth } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        switch (element.type) {
            case ContentElementType.TextBlock:
                return (
                    <TextBlockView
                        element={element as TextBlockElement}
                        index={index} />
                );
            case ContentElementType.Image:
                return (
                    <ImageView
                        element={element as ImageElement}
                        index={index}
                    />
                );
            case ContentElementType.ImageSet:
                return (
                    <ImageSetView
                        element={element as ImageSetElement}
                        index={index}
                    />
                );
            case ContentElementType.Container:
                return (
                    <ContainerView
                        element={element as ContainerElement}
                        index={index}
                    />
                );
            case ContentElementType.Column:
                return (
                    <ColumnView
                        element={element as ColumnElement}
                        containerWidth={containerWidth}
                        index={index}
                    />
                );
            case ContentElementType.ColumnSet:
                return (
                    <ColumnSetView
                        element={element as ColumnSetElement}
                        index={index}
                    />
                );
            case ContentElementType.FactSet:
                return (
                    <FactSetView
                        element={element as FactSetElement}
                        index={index}
                    />
                );
            case ContentElementType.InputText:
                return (
                    <TextInputView
                        element={element as TextInputElement}
                        index={index}
                    />
                );
            case ContentElementType.DateInput:
                return (
                    <DateInputView
                        element={element as DateInputElement}
                        index={index}
                    />
                );
            case ContentElementType.TimeInput:
                return (
                    <TimeInputView
                        element={element as TimeInputElement}
                        index={index}
                    />
                );
            case ContentElementType.NumberInput:
                return (
                    <NumberInputView
                        element={element as NumberInputElement}
                        index={index}
                    />
                );
            default:
                return null;
        }
    }
}
