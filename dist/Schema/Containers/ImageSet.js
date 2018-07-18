import { ContentElement } from '../Base/ContentElement';
import { ImageElement } from '../CardElements/Image';
export class ImageSetElement extends ContentElement {
    constructor(json, parent) {
        super(json, parent);
        this.images = [];
        if (this.isValid) {
            this.imageSize = json.imageSize;
            this.images = [];
            if (json.images) {
                json.images.forEach((item) => {
                    let image = new ImageElement(item, this);
                    if (image && image.isValid) {
                        this.images.push(image);
                    }
                });
            }
        }
    }
    get children() {
        if (this.images) {
            return this.images;
        }
        return [];
    }
    getRequiredProperties() {
        return ['type', 'images'];
    }
}
