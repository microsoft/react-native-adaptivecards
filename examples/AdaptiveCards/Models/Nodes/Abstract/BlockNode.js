import { ViewNode } from './ViewNode';
export class BlockNode extends ViewNode {
    constructor(parent, json) {
        super(parent, json);
        this.spacing = json.spacing;
        this.separator = json.separator;
    }
}
