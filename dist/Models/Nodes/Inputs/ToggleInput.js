import { InputType } from '../../../Shared/Types';
import { InputNode } from '../Abstract/InputNode';
export class ToggleInputNode extends InputNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = InputType.ToggleInput;
        this.title = payload.title;
        this.valueOff = payload.valueOff;
        this.valueOn = payload.valueOn;
        this.value = payload.value === payload.valueOn;
    }
    stringify() {
        if (this.value) {
            return this.valueOn;
        }
        return this.valueOff;
    }
    isValid() {
        return true;
    }
    handleInput(input) {
        if (input !== undefined) {
            this.value = input;
        }
    }
}
