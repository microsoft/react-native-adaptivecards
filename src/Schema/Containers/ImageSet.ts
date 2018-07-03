import { ImageSize } from '../../Shared/Enums';
import { EnumUtils } from '../../Shared/Utils';
import { ElementStyleConfig } from '../../Styles/StyleManager';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { ImageElement } from '../CardElements/Image';

export class ImageSetElement extends ContentElement {
    // Required
    public readonly images: Array<ImageElement> = [];
    // Optional
    public readonly imageSize?: ImageSize = ImageSize.Auto;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.images = this.createImageSet(json.images);
            this.imageSize = EnumUtils.getStringEnumValueOrDefault(ImageSize, json.imageSize, ImageSize.Auto) as ImageSize;
        }
    }

    public getTypeName(): string {
        return ContentElementType.ImageSet;
    }

    public getRequiredProperties(): Array<string> {
        return ['images'];
    }

    public getStyleConfig(): ElementStyleConfig {
        return {
            spacing: this.spacing,
            imgSize: this.imageSize,
        };
    }

    public hasImages(): boolean {
        return this.images && this.images.length > 0;
    }

    private createImageSet(json: any): Array<ImageElement> {
        let imageSet: Array<ImageElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let image: ImageElement = new ImageElement(item, this);
                if (image && image.isValidJSON) {
                    imageSet.push(image);
                }
            });
        }
        return imageSet;
    }
}
