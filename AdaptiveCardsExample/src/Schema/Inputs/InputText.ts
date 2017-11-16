import {
    InputTextStyle,
} from '../enums';
import { getEnumValueOrDefault } from '../../utils';
import CardElementType from '../Elements/CardElementType';
import Input from './Input';

export default class InputText extends Input {
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
            this.style = getEnumValueOrDefault(InputTextStyle, json.style, InputTextStyle.Text);
        }
    }

    getTypeName(): string {
        return CardElementType.InputText;
    }
    getRequiredProperties(): Array<string> {
        return ['id'];
    }
}
