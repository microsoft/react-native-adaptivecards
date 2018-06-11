import { Utils } from '../../utils';
import { CardElementType } from '../Elements/CardElementType';
import { InputTextStyle } from '../enums';
import { InputElement } from './Input';

export class TextInputElement extends InputElement {
    // Optional
    readonly isMultiline?: boolean;
    readonly maxLength?: number;
    readonly placeholder?: string;
    readonly style?: InputTextStyle;

    public constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.isMultiline = json.isMultiline || false;
            this.maxLength = json.maxLength;
            this.placeholder = json.placeholder;
            this.style = Utils.getEnumValueOrDefault(InputTextStyle, json.style, InputTextStyle.Text);
        }
    }

    getTypeName(): string {
        return CardElementType.InputText;
    }
    getRequiredProperties(): Array<string> {
        return ['id'];
    }
}
