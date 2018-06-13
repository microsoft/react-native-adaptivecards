import { Utils } from '../../utils';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { FontSize, FontWeight, HorizontalAlignment, TextColor } from '../Base/Enums';
export class TextBlockElement extends ContentElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.text = json.text;
            this.color = Utils.getStringEnumValueOrDefault(TextColor, json.color, TextColor.Default);
            this.horizontalAlignment =
                Utils.getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left);
            this.isSubtle = json.isSubtle || false;
            this.maxLines = json.maxLines;
            this.size = Utils.getStringEnumValueOrDefault(FontSize, json.size, FontSize.Default);
            this.weight = Utils.getStringEnumValueOrDefault(FontWeight, json.weight, FontWeight.Default);
            this.wrap = json.wrap || false;
        }
    }
    getTypeName() {
        return ContentElementType.TextBlock;
    }
    getRequiredProperties() {
        return ['text'];
    }
}
