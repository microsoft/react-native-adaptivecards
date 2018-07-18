import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement } from '../Base/ContentElement';
import { ImageElement } from '../CardElements/Image';

export class ImageSetElement extends ContentElement {
    // Required
    public readonly images: Array<ImageElement> = [];
    // Optional
    public readonly imageSize?: 'auto' | 'stretch' | 'small' | 'medium' | 'large';

    constructor(json: any, parent: AbstractElement) {
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

    public get children(): AbstractElement[] {
        if (this.images) {
            return this.images;
        }
        return [];
    }

    protected getRequiredProperties(): Array<string> {
        return ['type', 'images'];
    }
}
