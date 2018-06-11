import { CardElementType } from '../Elements/CardElementType';
import { InputElement } from './Input';

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
        return CardElementType.TimeInput;
    }
    getRequiredProperties(): Array<string> {
        return ['id'];
    }
}
