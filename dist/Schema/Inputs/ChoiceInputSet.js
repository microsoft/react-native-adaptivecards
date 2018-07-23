import { InputElement } from '../Abstract/InputElement';
import { ChoiceInputElement } from './ChoiceInput';
export class ChoiceInputSetElement extends InputElement {
    constructor(json, parent) {
        super(json, parent);
        this.choices = [];
        if (this.isValid) {
            this.isMultiSelect = json.isMultiSelect || false;
            this.style = json.style;
            this.choices = [];
            if (json.choices) {
                json.choices.forEach((item) => {
                    let inputChoice = new ChoiceInputElement(item, this);
                    if (inputChoice && inputChoice.isValid) {
                        this.choices.push(inputChoice);
                    }
                });
            }
        }
    }
    get children() {
        if (this.choices) {
            return this.choices;
        }
        return [];
    }
    validate(input) {
        return true;
    }
    get requiredProperties() {
        return ['type', 'id', 'choices'];
    }
}
