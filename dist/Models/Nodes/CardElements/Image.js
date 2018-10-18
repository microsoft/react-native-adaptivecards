import { SelectableContainerType } from '../../../Shared/Types';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
export class ImageNode extends SelectableContainerNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = SelectableContainerType.Image;
        this.url = json.url;
        this.alt = json.altText;
        this.horizontalAlignment = json.horizontalAlignment;
        this.size = json.size;
        this.style = json.style;
    }
}
