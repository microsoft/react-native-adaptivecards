import { ContentElement } from '../Abstract/ContentElement';
import { ImageElement } from '../CardElements/Image';
import { IElement } from '../Interfaces/IElement';

export class ImageSetElement extends ContentElement {
    // Required
    public readonly images: Array<ImageElement> = [];
    // Optional
    public readonly imageSize?: 'auto' | 'stretch' | 'small' | 'medium' | 'large';

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.imageSize = json.imageSize;
            this.images = [];
            if (json.images) {
                json.images.forEach((item: any) => {
                    let image: ImageElement = new ImageElement(item, this);
                    if (image && image.isValid) {
                        this.images.push(image);
                    }
                });
            }
        }
    }

    public get children() {
        if (this.images) {
            return this.images;
        }
        return [];
    }

    public get requiredProperties() {
        return ['type', 'images'];
    }
}
