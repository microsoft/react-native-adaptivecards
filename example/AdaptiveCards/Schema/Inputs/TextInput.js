import { InputElement } from '../Abstract/InputElement';
export class TextInputElement extends InputElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
        if (this.isValid) {
            this.isMultiline = json.isMultiline || false;
            this.maxLength = json.maxLength;
            this.placeholder = json.placeholder;
            this.style = json.style;
        }
    }
    validate(input) {
        if (this.maxLength) {
            if (input !== undefined && input.length > this.maxLength) {
                return false;
            }
        }
        return true;
    }
    get requiredProperties() {
        return ['type', 'id'];
    }
}
