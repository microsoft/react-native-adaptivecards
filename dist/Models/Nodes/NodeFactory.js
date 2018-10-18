import { ElementType, InputType, PlainContainerType, SelectableContainerType } from '../../Shared/Types';
import { ImageNode } from './CardElements/Image';
import { TextBlockNode } from './CardElements/TextBlock';
import { AdaptiveCardNode } from './Cards/AdaptiveCard';
import { ColumnNode } from './Containers/Column';
import { ColumnSetNode } from './Containers/ColumnSet';
import { ContainerNode } from './Containers/Container';
import { FactSetNode } from './Containers/FactSet';
import { ImageSetNode } from './Containers/ImageSet';
import { ChoiceSetNode } from './Inputs/ChoiceSet';
import { DateInputNode } from './Inputs/DateInput';
import { NumberInputNode } from './Inputs/NumberInput';
import { TextInputNode } from './Inputs/TextInput';
import { TimeInputNode } from './Inputs/TimeInput';
import { ToggleInputNode } from './Inputs/ToggleInput';
export class NodeFactory {
    static create(parent, json) {
        if (!json) {
            return undefined;
        }
        switch (json.type) {
            case SelectableContainerType.Image:
                return new ImageNode(parent, json);
            case ElementType.TextBlock:
                return new TextBlockNode(parent, json);
            case SelectableContainerType.Column:
                return new ColumnNode(parent, json);
            case SelectableContainerType.ColumnSet:
                return new ColumnSetNode(parent, json);
            case SelectableContainerType.Container:
                return new ContainerNode(parent, json);
            case PlainContainerType.FactSet:
                return new FactSetNode(parent, json);
            case PlainContainerType.ImageSet:
                return new ImageSetNode(parent, json);
            case InputType.TextInput:
                return new TextInputNode(parent, json);
            case InputType.DateInput:
                return new DateInputNode(parent, json);
            case InputType.TimeInput:
                return new TimeInputNode(parent, json);
            case InputType.NumberInput:
                return new NumberInputNode(parent, json);
            case InputType.ChoiceSet:
                return new ChoiceSetNode(parent, json);
            case InputType.ToggleInput:
                return new ToggleInputNode(parent, json);
            case SelectableContainerType.AdaptiveCard:
                return new AdaptiveCardNode(parent, json);
            default:
                return undefined;
        }
    }
    static createSet(parent, json) {
        let modelSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let model = NodeFactory.create(parent, item);
                if (model) {
                    modelSet.push(model);
                }
            });
        }
        return modelSet;
    }
}
