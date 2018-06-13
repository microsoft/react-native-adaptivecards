import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';

export class DateInputElement extends InputElement {
    // Optional
    readonly max?: number;
    readonly min?: number;
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
}
