import { NumberUtils } from '../../Utils/NumberUtils';
import { TimeUtils } from '../../Utils/TimeUtils';
import { InputElement } from '../Base/InputElement';
export class TimeInputElement extends InputElement {
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
            let minTime = TimeUtils.extractTime(this.min);
            let maxTime = TimeUtils.extractTime(this.max);
            let time = TimeUtils.extractTime(input);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
    getRequiredProperties() {
        return ['id'];
    }
}
