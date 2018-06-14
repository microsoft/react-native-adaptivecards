import { Utils } from '../../Shared/Utils';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';

export class DateInputElement extends InputElement {
    // Optional
    readonly max?: string;
    readonly min?: string;
    readonly placeholder?: string;

    public constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }

    getTypeName(): string {
        return ContentElementType.DateInput;
    }

    getRequiredProperties(): Array<string> {
        return ['id'];
    }

    validateForm(value?: string) {
        if (value && value.length !== 0) {
            let minTime = Utils.extractDate(this.min);
            let maxTime = Utils.extractDate(this.max);
            let time = Utils.extractDate(value);
            return Utils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
}
