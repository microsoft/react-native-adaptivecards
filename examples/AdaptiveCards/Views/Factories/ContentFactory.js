import * as React from 'react';
import { SeparateLine } from '../../Components/Basic/SeparateLine';
import { ContentType } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
import { TextBlockView } from '../CardElements/TextBlock';
import { AdaptiveCardView } from '../Cards/AdaptiveCard';
import { ColumnSetView } from '../Containers/ColumnSet';
import { ContainerView } from '../Containers/Container';
import { FactSetView } from '../Containers/FactSet';
import { ImageSetView } from '../Containers/ImageSet';
import { CounterView } from '../Customs/Microsoft.Counter';
import { ChoiceSetView } from '../Inputs/ChoiceSetInput';
import { DateInputView } from '../Inputs/DateInput';
import { NumberInputView } from '../Inputs/NumberInput';
import { PeoplePickerView } from '../Inputs/PeoplePicker';
import { TextInputView } from '../Inputs/TextInput';
import { TimeInputView } from '../Inputs/TimeInput';
import { ToggleInputView } from '../Inputs/ToggleInput';
export class ContentFactory {
    static createView(model, index, theme) {
        if (model) {
            let elementView = ContentFactory.createElement(model, index, theme);
            if (index > 0 && model.separator) {
                let height = undefined;
                if (model.spacing) {
                    height = StyleManager.getSpacing(model.spacing);
                }
                return [
                    React.createElement(SeparateLine, { height: height, key: 'SeparateLine' + index }),
                    elementView
                ];
            }
            return [elementView];
        }
        return null;
    }
    static createElement(model, index, theme) {
        if (model) {
            switch (model.type) {
                case ContentType.AdaptiveCard:
                    return (React.createElement(AdaptiveCardView, { key: 'AdaptiveCardView' + index, model: model, index: index, theme: theme }));
                case ContentType.TextBlock:
                    return (React.createElement(TextBlockView, { key: 'TextBlockView' + index, model: model, index: index, theme: theme }));
                case ContentType.Image:
                    return (React.createElement(ImageView, { key: 'ImageView' + index, model: model, index: index, theme: theme }));
                case ContentType.Container:
                    return (React.createElement(ContainerView, { key: 'ContainerView' + index, model: model, index: index, theme: theme }));
                case ContentType.ColumnSet:
                    return (React.createElement(ColumnSetView, { key: 'ColumnSetView' + index, model: model, index: index, theme: theme }));
                case ContentType.FactSet:
                    return (React.createElement(FactSetView, { key: 'FactSetView' + index, model: model, index: index, theme: theme }));
                case ContentType.ImageSet:
                    return (React.createElement(ImageSetView, { key: 'ImageSetView' + index, model: model, index: index, theme: theme }));
                case ContentType.TextInput:
                    return (React.createElement(TextInputView, { key: 'TextInputView' + index, model: model, index: index, theme: theme }));
                case ContentType.NumberInput:
                    return (React.createElement(NumberInputView, { key: 'NumberInput' + index, model: model, index: index, theme: theme }));
                case ContentType.DateInput:
                    return (React.createElement(DateInputView, { key: 'DateInputView' + index, model: model, index: index, theme: theme }));
                case ContentType.TimeInput:
                    return (React.createElement(TimeInputView, { key: 'TimeInputView' + index, model: model, index: index, theme: theme }));
                case ContentType.ChoiceSetInput:
                    return (React.createElement(ChoiceSetView, { key: 'ChoiceSetView' + index, model: model, index: index, theme: theme }));
                case ContentType.ToggleInput:
                    return (React.createElement(ToggleInputView, { key: 'ToggleInputView' + index, model: model, index: index, theme: theme }));
                case ContentType.PeoplePicker:
                    return (React.createElement(PeoplePickerView, { key: 'PeoplePickerView' + index, model: model, index: index, theme: theme }));
                case ContentType.Counter:
                    return (React.createElement(CounterView, { key: 'CounterView' + index, model: model, index: index, theme: theme }));
                default:
                    return null;
            }
        }
        return null;
    }
}
