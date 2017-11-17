import {
    ImageSize,
} from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import CardElement from '../Elements/CardElement';
import CardElementType from '../Elements/CardElementType';
import Image from '../Elements/Image';

export default class ImageSet extends CardElement {
    // Required
    readonly images: Array<Image> = [];
    // Optional
    readonly imageSize?: ImageSize = ImageSize.Auto;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.images = this.createImageSet(json.images);
            this.imageSize = getStringEnumValueOrDefault(ImageSize, json.imageSize, ImageSize.Auto) as ImageSize;
        }
    }

    getTypeName(): string {
        return CardElementType.ImageSet;
    }
    getRequiredProperties(): Array<string> {
        return ['images'];
    }

    private createImageSet(json: any): Array<Image> {
        let imageSet: Array<Image> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let image: Image = new Image(item);
                if (image && image.isValidJSON) {
                    imageSet.push(image);
                }
            });
        }
        return imageSet;
    }

    hasImages(): boolean {
        return this.images && this.images.length > 0;
    }
}
