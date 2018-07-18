import { NumberUtils } from '../../Utils/NumberUtils';
import { AbstractElement } from '../Base/AbstractElement';
import { InputElement } from '../Base/InputElement';

export class NumberInputElement extends InputElement {
    // Optional
    public readonly max?: number;
    public readonly min?: number;
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
            if (NumberUtils.isNumberStrict(input)) {
                return NumberUtils.isInRange(Number(input), this.min, this.max);
            }
        }
        return true;
    }

    protected getRequiredProperties(): Array<string> {
        return ['type', 'id'];
    }
}
