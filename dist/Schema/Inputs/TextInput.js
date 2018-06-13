import { Utils } from '../../utils';
import { ContentElementType } from '../Base/ContentElement';
import { InputTextStyle } from '../Base/Enums';
import { InputElement } from '../Base/InputElement';
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
        return ContentElementType.InputText;
    }
    getRequiredProperties() {
        return ['id'];
    }
}
