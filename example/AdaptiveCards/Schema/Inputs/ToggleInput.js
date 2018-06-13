import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';
export class ToggleInputElement extends InputElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.title = json.title;
            this.valueOff = json.valueOff;
            this.valueOn = json.valueOn;
        }
    }
    getTypeName() {
        return ContentElementType.InputToggle;
    }
    getRequiredProperties() {
        return ['id', 'title'];
    }
}
