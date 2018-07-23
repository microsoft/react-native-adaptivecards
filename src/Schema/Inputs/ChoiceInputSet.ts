import { InputElement } from '../Abstract/InputElement';
import { IElement } from '../Interfaces/IElement';
import { ChoiceInputElement } from './ChoiceInput';

export class ChoiceInputSetElement extends InputElement {
    // Required 
    public readonly choices: Array<ChoiceInputElement> = [];

    // Optional
    public readonly isMultiSelect?: boolean;
    public readonly style?: 'compact' | 'expanded';

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.isMultiSelect = json.isMultiSelect || false;
            this.style = json.style;
            this.choices = [];
            if (json.choices) {
                json.choices.forEach((item: any) => {
                    let inputChoice: ChoiceInputElement = new ChoiceInputElement(item, this);
                    if (inputChoice && inputChoice.isValid) {
                        this.choices.push(inputChoice);
                    }
                });
            }
        }
    }

    public get children() {
        if (this.choices) {
            return this.choices;
        }
        return [];
    }

    public validate(input: string): boolean {
        return true;
    }

    public get requiredProperties() {
        return ['type', 'id', 'choices'];
    }
}
