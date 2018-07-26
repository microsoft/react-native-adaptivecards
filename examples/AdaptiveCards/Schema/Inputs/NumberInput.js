import { NumberUtils } from '../../Utils/NumberUtils';
import { InputElement } from '../Abstract/InputElement';
export class NumberInputElement extends InputElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
        if (this.isValid) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }
    validate(input) {
        if (input && input.length !== 0) {
            if (NumberUtils.isNumberStrict(input)) {
                return NumberUtils.isInRange(Number(input), this.min, this.max);
            }
        }
        return true;
    }
    get requiredProperties() {
        return ['type', 'id'];
    }
}
