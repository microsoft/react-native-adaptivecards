import { ElementType, InputType, PlainContainerType, SelectableContainerType } from '../../Shared/Types';
import { BlockNode } from './Abstract/BlockNode';
import { ViewNode } from './Abstract/ViewNode';
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
    public static create(parent: ViewNode, payload: any): BlockNode {
        if (!payload) {
            return undefined;
        }

        switch (payload.type) {
            case SelectableContainerType.Image:
                return new ImageNode(parent, payload);
            case ElementType.TextBlock:
                return new TextBlockNode(parent, payload);
            case SelectableContainerType.Column:
                return new ColumnNode(parent, payload);
            case SelectableContainerType.ColumnSet:
                return new ColumnSetNode(parent, payload);
            case SelectableContainerType.Container:
                return new ContainerNode(parent, payload);
            case PlainContainerType.FactSet:
                return new FactSetNode(parent, payload);
            case PlainContainerType.ImageSet:
                return new ImageSetNode(parent, payload);
            case InputType.TextInput:
                return new TextInputNode(parent, payload);
            case InputType.DateInput:
                return new DateInputNode(parent, payload);
            case InputType.TimeInput:
                return new TimeInputNode(parent, payload);
            case InputType.NumberInput:
                return new NumberInputNode(parent, payload);
            case InputType.ChoiceSet:
                return new ChoiceSetNode(parent, payload);
            case InputType.ToggleInput:
                return new ToggleInputNode(parent, payload);
            case SelectableContainerType.AdaptiveCard:
                return new AdaptiveCardNode(parent, payload);
            default:
                return undefined;
        }
    }

    public static createSet(parent: ViewNode, payload: any): Array<BlockNode> {
        let modelSet: Array<BlockNode> = [];
        if (payload && payload.length > 0) {
            payload.forEach((item: any) => {
                let model: BlockNode = NodeFactory.create(parent, item);
                if (model) {
                    modelSet.push(model);
                }
            });
        }
        return modelSet;
    }
}
