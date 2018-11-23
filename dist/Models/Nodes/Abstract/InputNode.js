import { BlockNode } from './BlockNode';
export class InputNode extends BlockNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.placeholder = payload.placeholder;
    }
    onInput(input, context) {
        if (this.handleInput) {
            this.handleInput(input);
        }
        if (context) {
            context.onUpdate();
        }
    }
}
