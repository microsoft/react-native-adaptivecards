import { ContentElement } from '../Base/ContentElement';
export class InputElement extends ContentElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.id = json.id;
            this.value = json.value;
        }
    }
    isInput() {
        return true;
    }
    getAllInputFieldIds() {
        return [this.getId()];
    }
}
