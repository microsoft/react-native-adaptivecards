import { ElementType } from '../../../Shared/Types';
import { BlockNode } from '../Abstract/BlockNode';
export class TextBlockNode extends BlockNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = ElementType.TextBlock;
        this.text = payload.text;
        this.color = payload.color;
        this.horizontalAlignment = payload.horizontalAlignment;
        this.isSubtle = payload.isSubtle || false;
        this.maxLines = payload.maxLines;
        this.size = payload.size;
        this.weight = payload.weight;
        this.wrap = payload.wrap || false;
    }
}
