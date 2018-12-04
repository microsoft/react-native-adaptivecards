import * as React from 'react';

import { SeparateLine } from '../Components/Basic/SeparateLine';
import { CardContext } from '../Contexts/CardContext';
import { BlockNode } from '../Models/Nodes/Abstract/BlockNode';
import { ImageNode } from '../Models/Nodes/CardElements/Image';
import { MediaNode } from '../Models/Nodes/CardElements/Media';
import { TextBlockNode } from '../Models/Nodes/CardElements/TextBlock';
import { AdaptiveCardNode } from '../Models/Nodes/Cards/AdaptiveCard';
import { ColumnSetNode } from '../Models/Nodes/Containers/ColumnSet';
import { ContainerNode } from '../Models/Nodes/Containers/Container';
import { FactSetNode } from '../Models/Nodes/Containers/FactSet';
import { ImageSetNode } from '../Models/Nodes/Containers/ImageSet';
import { ChoiceSetNode } from '../Models/Nodes/Inputs/ChoiceSet';
import { DateInputNode } from '../Models/Nodes/Inputs/DateInput';
import { NumberInputNode } from '../Models/Nodes/Inputs/NumberInput';
import { TextInputNode } from '../Models/Nodes/Inputs/TextInput';
import { TimeInputNode } from '../Models/Nodes/Inputs/TimeInput';
import { ToggleInputNode } from '../Models/Nodes/Inputs/ToggleInput';
import { ElementType, InputType, PlainContainerType, SelectableContainerType } from '../Shared/Types';
import { StyleManager } from '../Styles/StyleManager';
import { ImageView } from './CardElements/Image';
import { MediaView } from './CardElements/Media';
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
    // tslint:disable-next-line:max-line-length
    public static createView(model: BlockNode, context: CardContext, index: number, theme: 'default' | 'emphasis'): JSX.Element[] {
        if (model) {
            let elementView = Factory.createElement(model, context, index, theme);
            if (index > 0 && model.separator) {
                let height: number = undefined;
                if (model.spacing) {
                    height = StyleManager.getSpacing(model.spacing, context.config);
                }
                return [
                    <SeparateLine
                        height={height}
                        config={context.config}
                        key={'SeparateLine' + index}
                    />,
                    elementView
                ];
            }
            return [elementView];
        }
        return null;
    }

    // tslint:disable-next-line:max-line-length
    public static createElement(model: BlockNode, context: CardContext, index: number, theme: 'default' | 'emphasis'): JSX.Element {
        if (model) {
            switch (model.type) {
                case SelectableContainerType.AdaptiveCard:
                    return (
                        <AdaptiveCardView
                            key={'AdaptiveCardView' + index}
                            model={model as AdaptiveCardNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case ElementType.TextBlock:
                    return (
                        <TextBlockView
                            key={'TextBlockView' + index}
                            model={model as TextBlockNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case SelectableContainerType.Image:
                    return (
                        <ImageView
                            key={'ImageView' + index}
                            model={model as ImageNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case ElementType.Media:
                    return (
                        <MediaView
                            key={'MediaView' + index}
                            model={model as MediaNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case SelectableContainerType.Container:
                    return (
                        <ContainerView
                            key={'ContainerView' + index}
                            model={model as ContainerNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case SelectableContainerType.ColumnSet:
                    return (
                        <ColumnSetView
                            key={'ColumnSetView' + index}
                            model={model as ColumnSetNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case PlainContainerType.FactSet:
                    return (
                        <FactSetView
                            key={'FactSetView' + index}
                            model={model as FactSetNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case PlainContainerType.ImageSet:
                    return (
                        <ImageSetView
                            key={'ImageSetView' + index}
                            model={model as ImageSetNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case InputType.TextInput:
                    return (
                        <TextInputView
                            key={'TextInputView' + index}
                            model={model as TextInputNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case InputType.NumberInput:
                    return (
                        <NumberInputView
                            key={'NumberInput' + index}
                            model={model as NumberInputNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case InputType.DateInput:
                    return (
                        <DateInputView
                            key={'DateInputView' + index}
                            model={model as DateInputNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case InputType.TimeInput:
                    return (
                        <TimeInputView
                            key={'TimeInputView' + index}
                            model={model as TimeInputNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case InputType.ChoiceSet:
                    return (
                        <ChoiceSetView
                            key={'ChoiceSetView' + index}
                            model={model as ChoiceSetNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                case InputType.ToggleInput:
                    return (
                        <ToggleInputView
                            key={'ToggleInputView' + index}
                            model={model as ToggleInputNode}
                            context={context}
                            index={index}
                            theme={theme}
                        />
                    );
                // case InputType.PeoplePicker:
                //     return (
                //         <PeoplePickerView
                //             key={'PeoplePickerView' + index}
                //             model={model as PeoplePickerNode}
                //             context={context}
                //             index={index}
                //             theme={theme}
                //         />
                //     );
                // case ElementType.Counter:
                //     return (
                //         <CounterView
                //             key={'CounterView' + index}
                //             model={model as CounterNode}
                //             context={context}
                //             index={index}
                //             theme={theme}
                //         />
                //     );
                default:
                    return null;
            }
        }
        return null;
    }
}
