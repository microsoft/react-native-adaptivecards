import { TypedElement } from '../TypedElement';
export class ActionElement extends TypedElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.title = json.title;
        }
    }
    supportAction() {
        return true;
    }
}
