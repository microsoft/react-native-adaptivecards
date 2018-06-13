import { Utils } from '../../utils';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { HorizontalAlignment, ImageSize, ImageStyle, } from '../Base/Enums';
import { ActionFactory } from '../Factories/ActionFactory';
export class ImageElement extends ContentElement {
    constructor(json) {
        super(json);
        this.size = ImageSize.Auto;
        if (this.isValidJSON) {
            this.url = json.url;
            this.altText = json.altText;
            this.horizontalAlignment =
                Utils.getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left);
            this.selectAction = ActionFactory.create(json.selectAction);
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
    supportAction() {
        return true;
    }
    getAction() {
        return this.selectAction;
    }
    getActions() {
        return [this.getAction()];
    }
    setSize(size) {
        this.size = Utils.getStringEnumValueOrDefault(ImageSize, size, ImageSize.Auto);
    }
    isFixedSize() {
        return this.size !== ImageSize.Auto && this.size !== ImageSize.Stretch;
    }
}
