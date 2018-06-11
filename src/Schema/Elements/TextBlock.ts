import { Utils } from '../../utils';
import {
    FontSize,
    FontWeight,
    HorizontalAlignment,
    TextColor
} from '../enums';
import { CardElement } from './CardElement';
import { CardElementType } from './CardElementType';

export class TextBlockElement extends CardElement {
    // Required
    readonly text: string;
    // Optional
    readonly color?: TextColor;
    readonly horizontalAlignment?: HorizontalAlignment;
    readonly isSubtle?: boolean;
    readonly maxLines?: number;
    readonly size?: FontSize;
    readonly weight?: FontWeight;
    readonly wrap?: boolean;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.text = json.text;
            this.color = Utils.getStringEnumValueOrDefault(TextColor, json.color, TextColor.Default) as TextColor;
            this.horizontalAlignment =
                Utils.getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left) as
                HorizontalAlignment;
            this.isSubtle = json.isSubtle || false;
            this.maxLines = json.maxLines;
            this.size = Utils.getStringEnumValueOrDefault(FontSize, json.size, FontSize.Default) as FontSize;
            this.weight = Utils.getStringEnumValueOrDefault(FontWeight, json.weight, FontWeight.Default) as FontWeight;
            this.wrap = json.wrap || false;
        }
    }

    getTypeName(): string {
        return CardElementType.TextBlock;
    }
    getRequiredProperties(): Array<string> {
        return ['text'];
    }
}
