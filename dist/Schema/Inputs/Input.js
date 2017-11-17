import CardElement from '../Elements/CardElement';
export default class Input extends CardElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.id = json.id;
            this.value = json.value;
        }
    }
}
