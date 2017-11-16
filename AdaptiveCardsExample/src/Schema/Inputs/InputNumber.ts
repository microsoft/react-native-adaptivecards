import CardElementType from '../Elements/CardElementType';
import Input from './Input';

export default class InputNumber extends Input {
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
        return CardElementType.InputNumber;
    }
    getRequiredProperties(): Array<string> {
        return ['id'];
    }
}
