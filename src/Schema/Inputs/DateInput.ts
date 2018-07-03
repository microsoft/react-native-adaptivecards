import { NumberUtils, TimeUtils } from '../../Shared/Utils';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';

export class DateInputElement extends InputElement {
    // Optional
    public readonly max?: string;
    public readonly min?: string;
    public readonly placeholder?: string;

    public constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }

    public getTypeName(): string {
        return ContentElementType.DateInput;
    }

    public getRequiredProperties(): Array<string> {
        return ['id'];
    }

    public validateForm(value?: string) {
        if (value && value.length !== 0) {
            let minTime = TimeUtils.extractDate(this.min);
            let maxTime = TimeUtils.extractDate(this.max);
            let time = TimeUtils.extractDate(value);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
}
