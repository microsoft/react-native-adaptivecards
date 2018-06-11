import { CardElement } from '../Elements/CardElement';
export class InputElement extends CardElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.id = json.id;
            this.value = json.value;
        }
    }
}
