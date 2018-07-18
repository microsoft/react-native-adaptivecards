import { AbstractElement } from '../Base/AbstractElement';
import { InputElement } from '../Base/InputElement';

export class TextInputElement extends InputElement {
    // Optional
    public readonly isMultiline?: boolean;
    public readonly maxLength?: number;
    public readonly placeholder?: string;
    public readonly style?: 'text' | 'tel' | 'url' | 'email';
    public readonly children: AbstractElement[] = [];

    public constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.isMultiline = json.isMultiline || false;
            this.maxLength = json.maxLength;
            this.placeholder = json.placeholder;
            this.style = json.style;
        }
    }

    public validate(input: string): boolean {
        // TODO:: verify styles.
        if (this.maxLength) {
            if (input !== undefined && input.length > this.maxLength) {
                return false;
            }
        }
        return true;
    }

    public getRequiredProperties(): Array<string> {
        return ['type', 'id'];
    }
}
