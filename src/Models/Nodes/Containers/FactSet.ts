import { PlainContainerType } from '../../../Shared/Types';
import { BlockNode } from '../Abstract/BlockNode';
import { ViewNode } from '../Abstract/ViewNode';
import { FactNode } from './Fact';

export class FactSetNode extends BlockNode {
    public readonly type = PlainContainerType.FactSet;
    public readonly children: FactNode[] = [];

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        if (payload.facts) {
            payload.facts.forEach((item: any) => {
                let fact = new FactNode(this, item);
                if (fact) {
                    this.children.push(fact);
                }
            });
        }
    }

    public get facts(): FactNode[] {
        return this.children;
    }
}
