import { HorizontalAlignment, ImageSize, ImageStyle, } from '../../Shared/Enums';
import { EnumUtils } from '../../Shared/Utils';
import { ContentElementType } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
export class ImageElement extends FormElement {
    constructor(json, parent) {
        super(json, parent);
        this.size = ImageSize.Auto;
        if (this.isValidJSON) {
            this.url = json.url;
            this.altText = json.altText;
            this.horizontalAlignment =
                EnumUtils.getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left);
            this.size = EnumUtils.getStringEnumValueOrDefault(ImageSize, json.size, ImageSize.Auto);
            this.style = EnumUtils.getStringEnumValueOrDefault(ImageStyle, json.style, ImageStyle.Default);
        }
    }
    getTypeName() {
        return ContentElementType.Image;
    }
    getRequiredProperties() {
        return ['url'];
    }
    getAction() {
        return this.selectAction;
    }
    getActions() {
        return [this.getAction()];
    }
    getChildren() {
        return [];
    }
    getStyleConfig() {
        return {
            horizontalAlignment: this.horizontalAlignment,
            imgSize: this.size,
            style: this.style,
            spacing: this.spacing,
        };
    }
    setSize(size) {
        this.size = EnumUtils.getStringEnumValueOrDefault(ImageSize, size, ImageSize.Auto);
    }
    isFixedSize() {
        return this.size !== ImageSize.Auto && this.size !== ImageSize.Stretch;
    }
}
