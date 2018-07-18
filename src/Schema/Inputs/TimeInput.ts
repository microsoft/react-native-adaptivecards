import { NumberUtils } from '../../Utils/NumberUtils';
import { TimeUtils } from '../../Utils/TimeUtils';
import { AbstractElement } from '../Base/AbstractElement';
import { InputElement } from '../Base/InputElement';

export class TimeInputElement extends InputElement {
    // Optional
    public readonly max?: string;
    public readonly min?: string;
    public readonly placeholder?: string;
    public readonly children: AbstractElement[] = [];

    public constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }

    public validate(input: string) {
        if (input && input.length !== 0) {
            let minTime = TimeUtils.extractTime(this.min);
            let maxTime = TimeUtils.extractTime(this.max);
            let time = TimeUtils.extractTime(input);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }

    protected getRequiredProperties(): Array<string> {
        return ['id'];
    }
}
