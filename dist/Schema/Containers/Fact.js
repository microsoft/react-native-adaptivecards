import { CardElement } from '../Base/CardElement';
export class FactElement extends CardElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.title = json.title;
            this.value = json.value;
        }
    }
    getTypeName() {
        return 'Fact';
    }
    getRequiredProperties() {
        return ['title', 'value'];
    }
}
