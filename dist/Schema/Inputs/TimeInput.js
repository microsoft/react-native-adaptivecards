import { NumberUtils, TimeUtils } from '../../Shared/Utils';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';
export class TimeInputElement extends InputElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }
    getTypeName() {
        return ContentElementType.TimeInput;
    }
    getRequiredProperties() {
        return ['id'];
    }
    validateForm(value) {
        if (value && value.length !== 0) {
            let minTime = TimeUtils.extractTime(this.min);
            let maxTime = TimeUtils.extractTime(this.max);
            let time = TimeUtils.extractTime(value);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
}
