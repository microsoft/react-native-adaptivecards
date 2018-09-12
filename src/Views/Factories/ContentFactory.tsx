import * as React from 'react';
import { SeparateLine } from '../../Components/Basic/SeparateLine';
import { ContentModel } from '../../Models/Abstract/ContentModel';
import { ImageModel } from '../../Models/CardElements/Image';
import { TextBlockModel } from '../../Models/CardElements/TextBlock';
import { CardModel } from '../../Models/Cards/Card';
import { ColumnSetModel } from '../../Models/Containers/ColumnSet';
import { ContainerModel } from '../../Models/Containers/Container';
import { FactSetModel } from '../../Models/Containers/FactSet';
import { ImageSetModel } from '../../Models/Containers/ImageSet';
import { ChoiceSetModel } from '../../Models/Inputs/ChoiceSet';
import { DateInputModel } from '../../Models/Inputs/DateInput';
import { NumberInputModel } from '../../Models/Inputs/NumberInput';
import { PeoplePickerModel } from '../../Models/Inputs/PeoplePicker';
import { TextInputModel } from '../../Models/Inputs/TextInput';
import { TimeInputModel } from '../../Models/Inputs/TimeInput';
import { ToggleInputModel } from '../../Models/Inputs/ToggleInput';
import { ContentType } from '../../Shared/Types';
import { ImageView } from '../CardElements/Image';
import { TextBlockView } from '../CardElements/TextBlock';
import { AdaptiveCardView } from '../Cards/AdaptiveCard';
import { ColumnSetView } from '../Containers/ColumnSet';
import { ContainerView } from '../Containers/Container';
import { FactSetView } from '../Containers/FactSet';
import { ImageSetView } from '../Containers/ImageSet';
import { ChoiceSetView } from '../Inputs/ChoiceSetInput';
import { DateInputView } from '../Inputs/DateInput';
import { NumberInputView } from '../Inputs/NumberInput';
import { PeoplePickerView } from '../Inputs/PeoplePicker';
import { TextInputView } from '../Inputs/TextInput';
import { TimeInputView } from '../Inputs/TimeInput';
import { ToggleInputView } from '../Inputs/ToggleInput';

export class ContentFactory {
    public static createView(model: ContentModel, index: number, theme: 'default' | 'emphasis'): JSX.Element[] {
        if (model) {
            let elementView = ContentFactory.createElement(model, index, theme);
            if (index > 0 && model.separator) {
                return [
                    <SeparateLine
                        key={'SeparateLine' + index}
                    />,
                    elementView
                ];
            }
            return [elementView];
        }
        return null;
    }

    public static createElement(model: ContentModel, index: number, theme: 'default' | 'emphasis'): JSX.Element {
        if (model) {
            switch (model.type) {
                case ContentType.AdaptiveCard:
                    return (
                        <AdaptiveCardView
                            key={'AdaptiveCardView' + index}
                            model={model as CardModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.TextBlock:
                    return (
                        <TextBlockView
                            key={'TextBlockView' + index}
                            model={model as TextBlockModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.Image:
                    return (
                        <ImageView
                            key={'ImageView' + index}
                            model={model as ImageModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.Container:
                    return (
                        <ContainerView
                            key={'ContainerView' + index}
                            model={model as ContainerModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.ColumnSet:
                    return (
                        <ColumnSetView
                            key={'ColumnSetView' + index}
                            model={model as ColumnSetModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.FactSet:
                    return (
                        <FactSetView
                            key={'FactSetView' + index}
                            model={model as FactSetModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.ImageSet:
                    return (
                        <ImageSetView
                            key={'ImageSetView' + index}
                            model={model as ImageSetModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.TextInput:
                    return (
                        <TextInputView
                            key={'TextInputView' + index}
                            model={model as TextInputModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.NumberInput:
                    return (
                        <NumberInputView
                            key={'NumberInput' + index}
                            model={model as NumberInputModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.DateInput:
                    return (
                        <DateInputView
                            key={'DateInputView' + index}
                            model={model as DateInputModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.TimeInput:
                    return (
                        <TimeInputView
                            key={'TimeInputView' + index}
                            model={model as TimeInputModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.ChoiceSetInput:
                    return (
                        <ChoiceSetView
                            key={'ChoiceSetView' + index}
                            model={model as ChoiceSetModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.ToggleInput:
                    console.log(model.type);
                    return (
                        <ToggleInputView
                            key={'ToggleInputView' + index}
                            model={model as ToggleInputModel}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentType.PeoplePicker:
                    return (
                        <PeoplePickerView
                            key={'PeoplePickerView' + index}
                            model={model as PeoplePickerModel}
                            index={index}
                            theme={theme}
                        />
                    );
                default:
                    return null;
            }
        }
        return null;
    }
}
