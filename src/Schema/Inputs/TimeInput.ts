import { NumberUtils } from '../../Utils/NumberUtils';
import { TimeUtils } from '../../Utils/TimeUtils';
import { InputElement } from '../Abstract/InputElement';
import { IElement } from '../Interfaces/IElement';

export class TimeInputElement extends InputElement {
    // Optional
    public readonly max?: string;
    public readonly min?: string;
    public readonly placeholder?: string;
    public readonly children: IElement[] = [];

    public constructor(json: any, parent: IElement) {
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

    public get requiredProperties() {
        return ['type', 'id'];
    }
}
