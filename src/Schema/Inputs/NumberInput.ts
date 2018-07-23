import { NumberUtils } from '../../Utils/NumberUtils';
import { InputElement } from '../Abstract/InputElement';
import { IElement } from '../Interfaces/IElement';

export class NumberInputElement extends InputElement {
    // Optional
    public readonly max?: number;
    public readonly min?: number;
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
            if (NumberUtils.isNumberStrict(input)) {
                return NumberUtils.isInRange(Number(input), this.min, this.max);
            }
        }
        return true;
    }

    public get requiredProperties() {
        return ['type', 'id'];
    }
}
