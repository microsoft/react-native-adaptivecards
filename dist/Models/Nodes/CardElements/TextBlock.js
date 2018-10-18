import { ElementType } from '../../../Shared/Types';
import { BlockNode } from '../Abstract/BlockNode';
export class TextBlockNode extends BlockNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = ElementType.TextBlock;
        this.text = json.text;
        this.color = json.color;
        this.horizontalAlignment = json.horizontalAlignment;
        this.isSubtle = json.isSubtle || false;
        this.maxLines = json.maxLines;
        this.size = json.size;
        this.weight = json.weight;
        this.wrap = json.wrap || false;
    }
}
