import { NumberUtils } from '../../Utils/NumberUtils';
import { TimeUtils } from '../../Utils/TimeUtils';
import { InputElement } from '../Base/InputElement';
export class DateInputElement extends InputElement {
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
            let minTime = TimeUtils.extractDate(this.min);
            let maxTime = TimeUtils.extractDate(this.max);
            let time = TimeUtils.extractDate(input);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
    getRequiredProperties() {
        return ['type', 'id'];
    }
}
