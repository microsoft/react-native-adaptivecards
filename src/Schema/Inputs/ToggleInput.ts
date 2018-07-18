import { AbstractElement } from '../Base/AbstractElement';
import { InputElement } from '../Base/InputElement';

export class ToggleInputElement extends InputElement {
    // Required
    public readonly title: string;
    // Optional
    public readonly valueOff?: string;
    public readonly valueOn?: string;
    public children: AbstractElement[] = [];

    public constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.title = json.title;
            this.valueOff = json.valueOff;
            this.valueOn = json.valueOn;
        }
    }
    public validate(input: string): boolean {
        return true;
    }

    public getRequiredProperties(): Array<string> {
        return ['type', 'id', 'title'];
    }
}
