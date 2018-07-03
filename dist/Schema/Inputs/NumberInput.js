import { NumberUtils } from '../../Shared/Utils';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';
export class NumberInputElement extends InputElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }
    getTypeName() {
        return ContentElementType.NumberInput;
    }
    getRequiredProperties() {
        return ['id'];
    }
    validateForm(value) {
        if (value && value.length !== 0) {
            console.log('pass length check');
            if (NumberUtils.isNumberStrict(value)) {
                console.log('pass strict number check');
                return NumberUtils.isInRange(Number(value), this.min, this.max);
            }
        }
        return true;
    }
}
