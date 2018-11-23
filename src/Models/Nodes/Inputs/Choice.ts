import { CardContext } from '../../../Contexts/CardContext';
import { InputType } from '../../../Shared/Types';
import { ViewNode } from '../Abstract/ViewNode';
import { ChoiceSetNode } from './ChoiceSet';

export class ChoiceNode extends ViewNode {
    public parent: ChoiceSetNode;
    public readonly type = InputType.Choice;
    public readonly title: string;
    public readonly value: string;
    public selected: boolean;

    constructor(parent: ChoiceSetNode, payload: any) {
        super(parent, payload);

        this.title = payload.title;
        this.value = payload.value;
        this.selected = false;
    }

    public onSelect(index: number, context: CardContext) {
        if (this.parent) {
            this.parent.onInput(index, context);
        }
    }
}
