import { InputType } from '../../../Shared/Types';
import { InputNode } from '../Abstract/InputNode';
export class TextInputNode extends InputNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = InputType.TextInput;
        this.value = payload.value;
        if (this.value === undefined) {
            this.value = '';
        }
        this.isMultiline = payload.isMultiline || false;
        this.maxLength = payload.maxLength;
        this.style = payload.style;
    }
    stringify() {
        return this.value;
    }
    isValid() {
        if (this.maxLength) {
            if (this.value && this.value.length > this.maxLength) {
                return false;
            }
        }
        return true;
    }
    handleInput(input) {
        if (input !== undefined) {
            this.value = input;
        }
    }
}
