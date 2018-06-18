import { AbstractElement } from '../Base/AbstractElement';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';

export class ToggleInputElement extends InputElement {
    // Required
    public readonly title: string;
    // Optional
    public readonly valueOff?: string;
    public readonly valueOn?: string;

    public constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.title = json.title;
            this.valueOff = json.valueOff;
            this.valueOn = json.valueOn;
        }
    }

    public getTypeName(): string {
        return ContentElementType.ToggleInput;
    }

    public getRequiredProperties(): Array<string> {
        return ['id', 'title'];
    }
}
