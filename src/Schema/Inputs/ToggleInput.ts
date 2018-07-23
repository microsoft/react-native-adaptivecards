import { InputElement } from '../Abstract/InputElement';
import { IElement } from '../Interfaces/IElement';

export class ToggleInputElement extends InputElement {
    // Required
    public readonly title: string;
    // Optional
    public readonly valueOff?: string;
    public readonly valueOn?: string;
    public children: IElement[] = [];

    public constructor(json: any, parent: IElement) {
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

    public get requiredProperties() {
        return ['type', 'id', 'title'];
    }
}
