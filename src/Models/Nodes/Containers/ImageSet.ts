import { PlainContainerType } from '../../../Shared/Types';
import { BlockNode } from '../Abstract/BlockNode';
import { ViewNode } from '../Abstract/ViewNode';
import { ImageNode } from '../CardElements/Image';

export class ImageSetNode extends BlockNode {
    public readonly type = PlainContainerType.ImageSet;
    public readonly children: ImageNode[] = [];
    public readonly imageSize: 'auto' | 'stretch' | 'small' | 'medium' | 'large';

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.imageSize = payload.imageSize;
        if (payload.images) {
            payload.images.forEach((item: any) => {
                let image = new ImageNode(this, item);
                if (image) {
                    this.children.push(image);
                }
            });
        }
    }

    public get images(): ImageNode[] {
        return this.children;
    }
}
