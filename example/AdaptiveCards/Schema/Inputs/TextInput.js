import { Utils } from '../../utils';
import { CardElementType } from '../Elements/CardElementType';
import { InputTextStyle } from '../enums';
import { InputElement } from './Input';
export class TextInputElement extends InputElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.isMultiline = json.isMultiline || false;
            this.maxLength = json.maxLength;
            this.placeholder = json.placeholder;
            this.style = Utils.getEnumValueOrDefault(InputTextStyle, json.style, InputTextStyle.Text);
        }
    }
    getTypeName() {
        return CardElementType.InputText;
    }
    getRequiredProperties() {
        return ['id'];
    }
}
