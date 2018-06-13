import { CardElement } from '../Base/CardElement';
export class ChoiceInputElement extends CardElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.title = json.title;
            this.value = json.value;
        }
    }
    getTypeName() {
        return 'Input.Choice';
    }
    getRequiredProperties() {
        return ['title', 'value'];
    }
}
