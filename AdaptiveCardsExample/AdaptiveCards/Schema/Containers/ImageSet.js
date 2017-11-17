import { ImageSize, } from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import CardElement from '../Elements/CardElement';
import CardElementType from '../Elements/CardElementType';
import Image from '../Elements/Image';
export default class ImageSet extends CardElement {
    constructor(json) {
        super(json);
        this.images = [];
        this.imageSize = ImageSize.Auto;
        if (this.isValidJSON) {
            this.images = this.createImageSet(json.images);
            this.imageSize = getStringEnumValueOrDefault(ImageSize, json.imageSize, ImageSize.Auto);
        }
    }
    getTypeName() {
        return CardElementType.ImageSet;
    }
    getRequiredProperties() {
        return ['images'];
    }
    createImageSet(json) {
        let imageSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let image = new Image(item);
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
