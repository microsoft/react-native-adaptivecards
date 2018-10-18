import { PlainContainerType } from '../../../Shared/Types';
import { BlockNode } from '../Abstract/BlockNode';
import { FactNode } from './Fact';
export class FactSetNode extends BlockNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = PlainContainerType.FactSet;
        this.children = [];
        if (payload.facts) {
            payload.facts.forEach((item) => {
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
