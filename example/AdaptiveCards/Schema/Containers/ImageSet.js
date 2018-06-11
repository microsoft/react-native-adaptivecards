import { Utils } from '../../utils';
import { CardElement } from '../Elements/CardElement';
import { CardElementType } from '../Elements/CardElementType';
import { ImageElement } from '../Elements/Image';
import { ImageSize } from '../enums';
export class ImageSetElement extends CardElement {
    constructor(json) {
        super(json);
        this.images = [];
        this.imageSize = ImageSize.Auto;
        if (this.isValidJSON) {
            this.images = this.createImageSet(json.images);
            this.imageSize = Utils.getStringEnumValueOrDefault(ImageSize, json.imageSize, ImageSize.Auto);
        }
    }
    getTypeName() {
        return CardElementType.ImageSet;
    }
    getRequiredProperties() {
        return ['images'];
    }
    supportAction() {
        return false;
    }
    createImageSet(json) {
        let imageSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let image = new ImageElement(item);
                if (image && image.isValidJSON) {
                    imageSet.push(image);
                }
            });
        }
        return imageSet;
    }
    hasImages() {
        return this.images && this.images.length > 0;
    }
}
