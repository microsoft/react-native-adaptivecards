import { SelectableContainerType } from '../../../Shared/Types';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { ViewNode } from '../Abstract/ViewNode';

export class ImageNode extends SelectableContainerNode {
    public readonly type = SelectableContainerType.Image;
    public readonly url: string;
    public readonly alt: string;
    public readonly horizontalAlignment: 'left' | 'center' | 'right';
    public readonly size: 'small' | 'medium' | 'large' | 'auto' | 'stretch';
    public readonly style: 'person' | 'default';

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.url = payload.url;
        this.alt = payload.altText;
        this.horizontalAlignment = payload.horizontalAlignment;
        this.size = payload.size;
        this.style = payload.style;
    }
}
