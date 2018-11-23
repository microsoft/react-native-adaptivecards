import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { TimeUtils } from '../../../Utils/Time';
import { InputNode } from '../Abstract/InputNode';
import { ViewNode } from '../Abstract/ViewNode';

export class DateInputNode extends InputNode<string, string> {
    public readonly type = InputType.DateInput;
    public max: string;
    public min: string;

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.value = payload.value;
        if (this.value === undefined || !TimeUtils.isDate(this.value)) {
            this.value = TimeUtils.getDateString(new Date());
        }
        this.max = payload.max;
        this.min = payload.min;
    }

    public stringify(): string {
        return this.value;
    }

    public isValid() {
        if (this.value && this.value.length !== 0) {
            let minTime = TimeUtils.extractDate(this.min);
            let maxTime = TimeUtils.extractDate(this.max);
            let time = TimeUtils.extractDate(this.value);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }

    protected handleInput(input: string): void {
        if (input !== undefined) {
            this.value = input;
        }
    }
}
