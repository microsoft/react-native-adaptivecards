import { ContentModel } from '../Abstract/ContentModel';
import { ImageModel } from '../CardElements/Image';
export class ImageSetModel extends ContentModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.images = [];
        this.imageSize = json.imageSize;
        this.images = [];
        if (json.images) {
            json.images.forEach((item) => {
                let image = new ImageModel(item, this, this.context);
                if (image) {
                    this.images.push(image);
                }
            });
        }
    }
    get children() {
        if (this.images) {
            return this.images;
        }
        return [];
    }
}
