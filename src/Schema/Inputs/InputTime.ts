import CardElementType from '../Elements/CardElementType';
import Input from './Input';

export default class InputTime extends Input {
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
        return CardElementType.InputTime;
    }
    getRequiredProperties(): Array<string> {
        return ['id'];
    }
}
