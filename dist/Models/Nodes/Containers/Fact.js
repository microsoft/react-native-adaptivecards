import { ElementType } from '../../../Shared/Types';
import { ViewNode } from '../Abstract/ViewNode';
export class FactNode extends ViewNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = ElementType.Fact;
        this.title = json.title;
        this.value = json.value;
    }
}
