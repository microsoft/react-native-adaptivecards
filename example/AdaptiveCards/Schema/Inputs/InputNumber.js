import CardElementType from '../Elements/CardElementType';
import Input from './Input';
export default class InputNumber extends Input {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }
    getTypeName() {
        return CardElementType.InputNumber;
    }
    getRequiredProperties() {
        return ['id'];
    }
}
