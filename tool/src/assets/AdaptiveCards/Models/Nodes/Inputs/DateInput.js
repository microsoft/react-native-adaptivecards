import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { TimeUtils } from '../../../Utils/Time';
import { InputNode } from '../Abstract/InputNode';
export class DateInputNode extends InputNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = InputType.DateInput;
        this.value = payload.value;
        if (this.value === undefined || !TimeUtils.isDate(this.value)) {
            this.value = TimeUtils.getDateString(new Date());
        }
        this.max = payload.max;
        this.min = payload.min;
    }
    stringify() {
        return this.value;
    }
    isValid() {
        if (this.value && this.value.length !== 0) {
            let minTime = TimeUtils.extractDate(this.min);
            let maxTime = TimeUtils.extractDate(this.max);
            let time = TimeUtils.extractDate(this.value);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
    handleInput(input) {
        if (input !== undefined) {
            this.value = input;
        }
    }
}
