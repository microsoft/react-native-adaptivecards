import { InputTextStyle } from '../../Shared/Enums';
import { EnumUtils } from '../../Shared/Utils';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';
export class TextInputElement extends InputElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.isMultiline = json.isMultiline || false;
            this.maxLength = json.maxLength;
            this.placeholder = json.placeholder;
            this.style = EnumUtils.getEnumValueOrDefault(InputTextStyle, json.style, InputTextStyle.Text);
        }
    }
    getTypeName() {
        return ContentElementType.TextInput;
    }
    getRequiredProperties() {
        return ['id'];
    }
}
