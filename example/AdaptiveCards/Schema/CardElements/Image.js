import { HorizontalAlignment, ImageSize, ImageStyle, } from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
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
                Utils.getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left);
            this.size = Utils.getStringEnumValueOrDefault(ImageSize, json.size, ImageSize.Auto);
            this.style = Utils.getStringEnumValueOrDefault(ImageStyle, json.style, ImageStyle.Default);
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
    setSize(size) {
        this.size = Utils.getStringEnumValueOrDefault(ImageSize, size, ImageSize.Auto);
    }
    isFixedSize() {
        return this.size !== ImageSize.Auto && this.size !== ImageSize.Stretch;
    }
}
