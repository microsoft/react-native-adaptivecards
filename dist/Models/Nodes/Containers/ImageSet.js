import { PlainContainerType } from '../../../Shared/Types';
import { BlockNode } from '../Abstract/BlockNode';
import { ImageNode } from '../CardElements/Image';
export class ImageSetNode extends BlockNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = PlainContainerType.ImageSet;
        this.children = [];
        this.imageSize = json.imageSize;
        if (json.images) {
            json.images.forEach((item) => {
                let image = new ImageNode(this, item);
                if (image) {
                    this.children.push(image);
                }
            });
        }
    }
    get images() {
        return this.children;
    }
}
