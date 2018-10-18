import { InputType } from '../../../Shared/Types';
import { InputNode } from '../Abstract/InputNode';
export class TextInputNode extends InputNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = InputType.TextInput;
        this.isMultiline = json.isMultiline || false;
        this.maxLength = json.maxLength;
        this.style = json.style;
    }
    get isValid() {
        if (this.maxLength) {
            if (this.value && this.value.length > this.maxLength) {
                return false;
            }
        }
        return true;
    }
}
