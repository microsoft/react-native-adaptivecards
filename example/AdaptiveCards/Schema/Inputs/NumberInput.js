import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';
export class NumberInputElement extends InputElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }
    getTypeName() {
        return ContentElementType.InputNumber;
    }
    getRequiredProperties() {
        return ['id'];
    }
}
