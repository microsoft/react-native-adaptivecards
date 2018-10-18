import { InputType } from '../../../Shared/Types';
import { InputNode } from '../Abstract/InputNode';
export class ToggleInputNode extends InputNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = InputType.ToggleInput;
        this.title = json.title;
        this.valueOff = json.valueOff;
        this.valueOn = json.valueOn;
        this.value = json.value === json.valueOn ? json.value : this.valueOff;
    }
    onInput(input) {
        if (input === this.valueOn || input === this.valueOff) {
            this.value = input;
        }
    }
    get isValid() {
        return this.value === this.valueOff && this.value === this.valueOn;
    }
}
