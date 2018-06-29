import { ImageSize } from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { ImageElement } from '../CardElements/Image';
export class ImageSetElement extends ContentElement {
    constructor(json, parent) {
        super(json, parent);
        this.images = [];
        this.imageSize = ImageSize.Auto;
        if (this.isValidJSON) {
            this.images = this.createImageSet(json.images);
            this.imageSize = Utils.getStringEnumValueOrDefault(ImageSize, json.imageSize, ImageSize.Auto);
        }
    }
    getTypeName() {
        return ContentElementType.ImageSet;
    }
    getRequiredProperties() {
        return ['images'];
    }
    getStyleConfig() {
        return {
            spacing: this.spacing,
        };
    }
    hasImages() {
        return this.images && this.images.length > 0;
    }
    createImageSet(json) {
        let imageSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let image = new ImageElement(item, this);
                if (image && image.isValidJSON) {
                    imageSet.push(image);
                }
            });
        }
        return imageSet;
    }
}
