import { SelectableContainerType } from '../../../Shared/Types';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
export class ImageNode extends SelectableContainerNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = SelectableContainerType.Image;
        this.url = payload.url;
        this.alt = payload.altText;
        this.horizontalAlignment = payload.horizontalAlignment;
        this.size = payload.size;
        this.style = payload.style;
    }
}
