import * as React from 'react';
import { SeparateLine } from '../Components/Basic/SeparateLine';
import { ElementType, InputType, PlainContainerType, SelectableContainerType } from '../Shared/Types';
import { StyleManager } from '../Styles/StyleManager';
import { ImageView } from './CardElements/Image';
import { TextBlockView } from './CardElements/TextBlock';
import { AdaptiveCardView } from './Cards/AdaptiveCard';
import { ColumnSetView } from './Containers/ColumnSet';
import { ContainerView } from './Containers/Container';
import { FactSetView } from './Containers/FactSet';
import { ImageSetView } from './Containers/ImageSet';
import { ChoiceSetView } from './Inputs/ChoiceSet';
import { DateInputView } from './Inputs/DateInput';
import { NumberInputView } from './Inputs/NumberInput';
import { TextInputView } from './Inputs/TextInput';
import { TimeInputView } from './Inputs/TimeInput';
import { ToggleInputView } from './Inputs/ToggleInput';
export class Factory {
    static createView(model, context, index, theme) {
        if (model) {
            let elementView = Factory.createElement(model, context, index, theme);
            if (index > 0 && model.separator) {
                let height = undefined;
                if (model.spacing) {
                    height = StyleManager.getSpacing(model.spacing, context.config);
                }
                return [
                    React.createElement(SeparateLine, { height: height, config: context.config, key: 'SeparateLine' + index }),
                    elementView
                ];
            }
            return [elementView];
        }
        return null;
    }
    static createElement(model, context, index, theme) {
        if (model) {
            switch (model.type) {
                case SelectableContainerType.AdaptiveCard:
                    return (React.createElement(AdaptiveCardView, { key: 'AdaptiveCardView' + index, model: model, context: context, index: index, theme: theme }));
                case ElementType.TextBlock:
                    return (React.createElement(TextBlockView, { key: 'TextBlockView' + index, model: model, context: context, index: index, theme: theme }));
                case SelectableContainerType.Image:
                    return (React.createElement(ImageView, { key: 'ImageView' + index, model: model, context: context, index: index, theme: theme }));
                case SelectableContainerType.Container:
                    return (React.createElement(ContainerView, { key: 'ContainerView' + index, model: model, context: context, index: index, theme: theme }));
                case SelectableContainerType.ColumnSet:
                    return (React.createElement(ColumnSetView, { key: 'ColumnSetView' + index, model: model, context: context, index: index, theme: theme }));
                case PlainContainerType.FactSet:
                    return (React.createElement(FactSetView, { key: 'FactSetView' + index, model: model, context: context, index: index, theme: theme }));
                case PlainContainerType.ImageSet:
                    return (React.createElement(ImageSetView, { key: 'ImageSetView' + index, model: model, context: context, index: index, theme: theme }));
                case InputType.TextInput:
                    return (React.createElement(TextInputView, { key: 'TextInputView' + index, model: model, context: context, index: index, theme: theme }));
                case InputType.NumberInput:
                    return (React.createElement(NumberInputView, { key: 'NumberInput' + index, model: model, context: context, index: index, theme: theme }));
                case InputType.DateInput:
                    return (React.createElement(DateInputView, { key: 'DateInputView' + index, model: model, context: context, index: index, theme: theme }));
                case InputType.TimeInput:
                    return (React.createElement(TimeInputView, { key: 'TimeInputView' + index, model: model, context: context, index: index, theme: theme }));
                case InputType.ChoiceSet:
                    return (React.createElement(ChoiceSetView, { key: 'ChoiceSetView' + index, model: model, context: context, index: index, theme: theme }));
                case InputType.ToggleInput:
                    return (React.createElement(ToggleInputView, { key: 'ToggleInputView' + index, model: model, context: context, index: index, theme: theme }));
                default:
                    return null;
            }
        }
        return null;
    }
}
