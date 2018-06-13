import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';

export class TimeInputElement extends InputElement {
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
        return ContentElementType.TimeInput;
    }

    getRequiredProperties(): Array<string> {
        return ['id'];
    }
}
