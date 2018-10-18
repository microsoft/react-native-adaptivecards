import { PlainContainerType } from '../../../Shared/Types';
import { BlockNode } from '../Abstract/BlockNode';
import { FactNode } from './Fact';
export class FactSetNode extends BlockNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = PlainContainerType.FactSet;
        this.children = [];
        if (json.facts) {
            json.facts.forEach((item) => {
                let fact = new FactNode(this, item);
                if (fact) {
                    this.children.push(fact);
                }
            });
        }
    }
    get facts() {
        return this.children;
    }
}
