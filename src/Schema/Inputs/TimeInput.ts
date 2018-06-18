import { Utils } from '../../Shared/Utils';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';

export class TimeInputElement extends InputElement {
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
        return ContentElementType.TimeInput;
    }

    public getRequiredProperties(): Array<string> {
        return ['id'];
    }

    public validateForm(value?: string) {
        if (value && value.length !== 0) {
            let minTime = Utils.extractTime(this.min);
            let maxTime = Utils.extractTime(this.max);
            let time = Utils.extractTime(value);
            return Utils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
}
