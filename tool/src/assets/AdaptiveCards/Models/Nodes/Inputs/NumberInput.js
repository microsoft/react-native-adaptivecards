import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { InputNode } from '../Abstract/InputNode';
export class NumberInputNode extends InputNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = InputType.NumberInput;
        this.max = json.max;
        this.min = json.min;
    }
    get isValid() {
        if (this.value && this.value.length !== 0) {
            if (NumberUtils.isNumberStrict(this.value)) {
                return NumberUtils.isInRange(Number(this.value), this.min, this.max);
            }
        }
        return true;
    }
}
