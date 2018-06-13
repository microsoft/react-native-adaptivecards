import { Utils } from '../../Shared/Utils';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';

export class NumberInputElement extends InputElement {
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
        return ContentElementType.NumberInput;
    }

    getRequiredProperties(): Array<string> {
        return ['id'];
    }

    validateForm(value?: string) {
        if (value && value.length !== 0) {
            console.log('pass length check');
            if (Utils.isNumberStrict(value)) {
                console.log('pass strict number check');
                return Utils.isInRange(Number(value), this.min, this.max);
            }
        }
        return true;
    }
}
