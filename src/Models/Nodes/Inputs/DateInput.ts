import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { TimeUtils } from '../../../Utils/Time';
import { InputNode } from '../Abstract/InputNode';
import { ViewNode } from '../Abstract/ViewNode';

export class DateInputNode extends InputNode {
    public readonly type = InputType.DateInput;
    public max: string;
    public min: string;

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        this.max = json.max;
        this.min = json.min;
    }

    public get isValid() {
        if (this.value && this.value.length !== 0) {
            let minTime = TimeUtils.extractDate(this.min);
            let maxTime = TimeUtils.extractDate(this.max);
            let time = TimeUtils.extractDate(this.value);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
}
