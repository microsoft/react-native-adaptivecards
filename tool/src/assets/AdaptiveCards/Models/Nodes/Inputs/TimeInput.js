import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { TimeUtils } from '../../../Utils/Time';
import { InputNode } from '../Abstract/InputNode';
export class TimeInputNode extends InputNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = InputType.TimeInput;
        this.max = json.max;
        this.min = json.min;
    }
    get isValid() {
        if (this.value && this.value.length !== 0) {
            let minTime = TimeUtils.extractTime(this.min);
            let maxTime = TimeUtils.extractTime(this.max);
            let time = TimeUtils.extractTime(this.value);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
}
