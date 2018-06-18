import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';
export class ToggleInputElement extends InputElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.title = json.title;
            this.valueOff = json.valueOff;
            this.valueOn = json.valueOn;
        }
    }
    getTypeName() {
        return ContentElementType.ToggleInput;
    }
    getRequiredProperties() {
        return ['id', 'title'];
    }
}
