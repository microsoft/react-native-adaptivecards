import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { InputNode } from '../Abstract/InputNode';
export class NumberInputNode extends InputNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = InputType.NumberInput;
        this.value = payload.value;
        if (this.value !== undefined) {
            let str = this.value.toString();
            if (NumberUtils.isNumberStrict(str)) {
                this.value = str;
            }
            else {
                this.value = '';
            }
        }
        else {
            this.value = '';
        }
        this.max = payload.max;
        this.min = payload.min;
    }
    stringify() {
        return this.value;
    }
    isValid() {
        if (this.value && this.value.length !== 0) {
            if (NumberUtils.isNumberStrict(this.value)) {
                return NumberUtils.isInRange(Number(this.value), this.min, this.max);
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
