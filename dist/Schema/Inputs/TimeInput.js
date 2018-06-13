import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';
export class TimeInputElement extends InputElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }
    getTypeName() {
        return ContentElementType.TimeInput;
    }
    getRequiredProperties() {
        return ['id'];
    }
}
