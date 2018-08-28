import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { ImageModel } from '../CardElements/Image';

export class ImageSetModel extends ContentModel {
    public images: ImageModel[] = [];
    public imageSize: 'auto' | 'stretch' | 'small' | 'medium' | 'large';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.imageSize = json.imageSize;
        this.images = [];
        if (json.images) {
            json.images.forEach((item: any) => {
                let image = new ImageModel(item, this, this.context);
                if (image) {
                    this.images.push(image);
                }
            });
        }
    }

    public get children() {
        if (this.images) {
            return this.images;
        }
        return [];
    }
}
