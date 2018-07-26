import { InputElement } from '../Abstract/InputElement';
export class ToggleInputElement extends InputElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
        if (this.isValid) {
            this.title = json.title;
            this.valueOff = json.valueOff;
            this.valueOn = json.valueOn;
        }
    }
    validate(input) {
        return true;
    }
    get requiredProperties() {
        return ['type', 'id', 'title'];
    }
}
