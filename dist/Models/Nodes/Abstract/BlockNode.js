import { ViewNode } from './ViewNode';
export class BlockNode extends ViewNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.spacing = payload.spacing;
        this.separator = payload.separator;
    }
}
