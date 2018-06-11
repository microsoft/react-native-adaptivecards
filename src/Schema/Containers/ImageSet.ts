import { Utils } from '../../utils';
import { CardElement } from '../Elements/CardElement';
import { CardElementType } from '../Elements/CardElementType';
import { ImageElement } from '../Elements/Image';
import { ImageSize } from '../enums';

export class ImageSetElement extends CardElement {
    // Required
    readonly images: Array<ImageElement> = [];
    // Optional
    readonly imageSize?: ImageSize = ImageSize.Auto;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.images = this.createImageSet(json.images);
            this.imageSize = Utils.getStringEnumValueOrDefault(ImageSize, json.imageSize, ImageSize.Auto) as ImageSize;
        }
    }

    getTypeName(): string {
        return CardElementType.ImageSet;
    }

    getRequiredProperties(): Array<string> {
        return ['images'];
    }

    supportAction() {
        return false;
    }

    private createImageSet(json: any): Array<ImageElement> {
        let imageSet: Array<ImageElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let image: ImageElement = new ImageElement(item);
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
