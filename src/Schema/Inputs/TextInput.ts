import { InputTextStyle } from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';

export class TextInputElement extends InputElement {
    // Optional
    public readonly isMultiline?: boolean;
    public readonly maxLength?: number;
    public readonly placeholder?: string;
    public readonly style?: InputTextStyle;

    public constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.isMultiline = json.isMultiline || false;
            this.maxLength = json.maxLength;
            this.placeholder = json.placeholder;
            this.style = Utils.getEnumValueOrDefault(InputTextStyle, json.style, InputTextStyle.Text);
        }
    }

    public getTypeName(): string {
        return ContentElementType.TextInput;
    }

    public getRequiredProperties(): Array<string> {
        return ['id'];
    }
}
