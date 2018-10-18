import { InputType } from '../../../Shared/Types';
import { ViewNode } from '../Abstract/ViewNode';
export class ChoiceNode extends ViewNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = InputType.Choice;
        this.title = payload.title;
        this.value = payload.value;
        this.selected = false;
    }
    onSelect(index, context) {
        if (this.parent) {
            this.parent.onInput(index, context);
        }
    }
}
