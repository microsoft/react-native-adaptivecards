import { InputElement } from '../Abstract/InputElement';
import { CallbackAction } from '../Internal/CallbackAction';
export class PeoplePickerElement extends InputElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValid) {
            this.callback = new CallbackAction(json.callback, this);
            this.placeholder = json.placeholder;
        }
    }
    get action() {
        return this.callback;
    }
    get inputFields() {
        return ['selected_people'];
    }
    getBackgroundImageUrl() {
        return undefined;
    }
    validate(input) {
        return true;
    }
    validateScope() {
        return true;
    }
    get requiredProperties() {
        return ['type'];
    }
}
