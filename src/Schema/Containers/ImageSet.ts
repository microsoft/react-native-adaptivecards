import { ImageSize } from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { ImageElement } from '../CardElements/Image';

export class ImageSetElement extends ContentElement {
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
        return ContentElementType.ImageSet;
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
