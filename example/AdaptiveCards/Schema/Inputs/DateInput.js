import { NumberUtils, TimeUtils } from '../../Shared/Utils';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';
export class DateInputElement extends InputElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }
    getTypeName() {
        return ContentElementType.DateInput;
    }
    getRequiredProperties() {
        return ['id'];
    }
    validateForm(value) {
        if (value && value.length !== 0) {
            let minTime = TimeUtils.extractDate(this.min);
            let maxTime = TimeUtils.extractDate(this.max);
            let time = TimeUtils.extractDate(value);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
}
