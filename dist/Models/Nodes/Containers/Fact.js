import { ElementType } from '../../../Shared/Types';
import { ViewNode } from '../Abstract/ViewNode';
export class FactNode extends ViewNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = ElementType.Fact;
        this.title = payload.title;
        this.value = payload.value;
    }
}
