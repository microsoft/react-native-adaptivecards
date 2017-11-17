import CardElementType from '../Elements/CardElementType';
import Input from './Input';
export default class InputToggle extends Input {
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
