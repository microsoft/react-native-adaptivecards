import { InputType } from '../../../Shared/Types';
import { ViewNode } from '../Abstract/ViewNode';
import { ChoiceSetNode } from './ChoiceSet';

export class ChoiceInputNode extends ViewNode {
    public parent: ChoiceSetNode;
    public readonly type = InputType.Choice;
    public readonly title: string;
    public readonly value: string;

    constructor(parent: ChoiceSetNode, json: any) {
        super(parent, json);

        this.title = json.title;
        this.value = json.value;
    }

    public onSelect() {
        if (this.parent) {
            this.parent.onInput(this.value);
        }
    }
}
