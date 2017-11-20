import { InputTextStyle, } from '../enums';
import { getEnumValueOrDefault } from '../../utils';
import CardElementType from '../Elements/CardElementType';
import Input from './Input';
export default class InputText extends Input {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.isMultiline = json.isMultiline || false;
            this.maxLength = json.maxLength;
            this.placeholder = json.placeholder;
            this.style = getEnumValueOrDefault(InputTextStyle, json.style, InputTextStyle.Text);
        }
    }
    getTypeName() {
        return CardElementType.InputText;
    }
    getRequiredProperties() {
        return ['id'];
    }
}
