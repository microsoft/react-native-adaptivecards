import CardElementType from '../Elements/CardElementType';
import Input from './Input';

export default class InputToggle extends Input {
    // Required
    readonly title: string;
    // Optional
    readonly valueOff?: string;
    readonly valueOn?: string;

    public constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.title = json.title;
            this.valueOff = json.valueOff;
            this.valueOn = json.valueOn;
        }
    }

    getTypeName(): string {
        return CardElementType.InputToggle;
    }
    getRequiredProperties(): Array<string> {
        return ['id', 'title'];
    }
}
