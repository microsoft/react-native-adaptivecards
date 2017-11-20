import { HorizontalAlignment, TextColor, FontSize, FontWeight } from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import CardElement from './CardElement';
import CardElementType from './CardElementType';
export default class TextBlock extends CardElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.text = json.text;
            this.color = getStringEnumValueOrDefault(TextColor, json.color, TextColor.Default);
            this.horizontalAlignment =
                getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left);
            this.isSubtle = json.isSubtle || false;
            this.maxLines = json.maxLines;
            this.size = getStringEnumValueOrDefault(FontSize, json.size, FontSize.Default);
            this.weight = getStringEnumValueOrDefault(FontWeight, json.weight, FontWeight.Default);
            this.wrap = json.wrap || false;
        }
    }
    getTypeName() {
        return CardElementType.TextBlock;
    }
    getRequiredProperties() {
        return ['text'];
    }
}
