import { BlockNode } from './BlockNode';
export class InputNode extends BlockNode {
    constructor(parent, json) {
        super(parent, json);
        this.value = json.value;
        this.placeholder = json.placeholder;
    }
    onInput(input) {
        if (input !== undefined) {
            this.value = input;
        }
    }
}
