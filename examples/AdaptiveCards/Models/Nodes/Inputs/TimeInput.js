import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { TimeUtils } from '../../../Utils/Time';
import { InputNode } from '../Abstract/InputNode';
export class TimeInputNode extends InputNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = InputType.TimeInput;
        this.value = payload.value;
        if (this.value === undefined || !TimeUtils.isTime(this.value)) {
            this.value = TimeUtils.getTimeString(new Date());
        }
        this.max = payload.max;
        this.min = payload.min;
    }
    stringify() {
        return this.value;
    }
    isValid() {
        if (this.value && this.value.length !== 0) {
            let minTime = TimeUtils.extractTime(this.min);
            let maxTime = TimeUtils.extractTime(this.max);
            let time = TimeUtils.extractTime(this.value);
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
