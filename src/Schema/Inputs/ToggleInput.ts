import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';

export class ToggleInputElement extends InputElement {
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
        return ContentElementType.InputToggle;
    }

    getRequiredProperties(): Array<string> {
        return ['id', 'title'];
    }
}
