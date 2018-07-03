import { NumberUtils } from '../../Shared/Utils';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';

export class NumberInputElement extends InputElement {
    // Optional
    public readonly max?: number;
    public readonly min?: number;
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
        return ContentElementType.NumberInput;
    }

    public getRequiredProperties(): Array<string> {
        return ['id'];
    }

    public validateForm(value?: string) {
        if (value && value.length !== 0) {
            console.log('pass length check');
            if (NumberUtils.isNumberStrict(value)) {
                console.log('pass strict number check');
                return NumberUtils.isInRange(Number(value), this.min, this.max);
            }
        }
        return true;
    }
}
