import {
    FontSize,
    FontWeight,
    HorizontalAlignment,
    TextColor
} from '../../Shared/Enums';
import { EnumUtils } from '../../Shared/Utils';
import { ElementStyleConfig } from '../../Styles/StyleManager';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement, ContentElementType } from '../Base/ContentElement';

export class TextBlockElement extends ContentElement {
    // Required
    public readonly text: string;
    // Optional
    public readonly color?: TextColor;
    public readonly horizontalAlignment?: HorizontalAlignment;
    public readonly isSubtle?: boolean;
    public readonly maxLines?: number;
    public readonly size?: FontSize;
    public readonly weight?: FontWeight;
    public readonly wrap?: boolean;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.text = json.text;
            this.color = EnumUtils.getStringEnumValueOrDefault(TextColor, json.color, TextColor.Default) as TextColor;
            this.horizontalAlignment =
                EnumUtils.getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left) as
                HorizontalAlignment;
            this.isSubtle = json.isSubtle || false;
            this.maxLines = json.maxLines;
            this.size = EnumUtils.getStringEnumValueOrDefault(FontSize, json.size, FontSize.Default) as FontSize;
            this.weight = EnumUtils.getStringEnumValueOrDefault(FontWeight, json.weight, FontWeight.Default) as FontWeight;
            this.wrap = json.wrap || false;
        }
    }

    public getStyleConfig(): ElementStyleConfig {
        return {
            color: this.color,
            horizontalAlignment: this.horizontalAlignment,
            isSubtle: this.isSubtle,
            fontSize: this.size,
            fontWeight: this.weight,
            wrap: this.wrap,
            spacing: this.spacing,
        };
    }

    public getTypeName(): string {
        return ContentElementType.TextBlock;
    }

    public getRequiredProperties(): Array<string> {
        return ['text'];
    }
}
