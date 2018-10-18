import { InputType } from '../../../Shared/Types';
import { ViewNode } from '../Abstract/ViewNode';
export class ChoiceInputNode extends ViewNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = InputType.Choice;
        this.title = json.title;
        this.value = json.value;
    }
    onSelect() {
        if (this.parent) {
            this.parent.onInput(this.value);
        }
    }
}
