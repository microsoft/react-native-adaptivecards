import { PlainContainerType } from '../../../Shared/Types';
import { BlockNode } from '../Abstract/BlockNode';
import { ImageNode } from '../CardElements/Image';
export class ImageSetNode extends BlockNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = PlainContainerType.ImageSet;
        this.children = [];
        this.imageSize = payload.imageSize;
        if (payload.images) {
            payload.images.forEach((item) => {
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
