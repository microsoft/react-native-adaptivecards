import {
    HorizontalAlignment,
    TextColor,
    FontSize,
    FontWeight
} from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import CardElement from './CardElement';
import CardElementType from './CardElementType';

export default class TextBlock extends CardElement {
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
            this.color = getStringEnumValueOrDefault(TextColor, json.color, TextColor.Default) as TextColor;
            this.horizontalAlignment =
                getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left) as
                HorizontalAlignment;
            this.isSubtle = json.isSubtle || false;
            this.maxLines = json.maxLines;
            this.size = getStringEnumValueOrDefault(FontSize, json.size, FontSize.Default) as FontSize;
            this.weight = getStringEnumValueOrDefault(FontWeight, json.weight, FontWeight.Default) as FontWeight;
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
