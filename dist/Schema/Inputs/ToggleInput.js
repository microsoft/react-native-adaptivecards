import { CardElementType } from '../Elements/CardElementType';
import { InputElement } from './Input';
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
        return CardElementType.InputToggle;
    }
    getRequiredProperties() {
        return ['id', 'title'];
    }
}
