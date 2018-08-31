import { CardContext } from '../../Contexts/CardContext';
import { TreeNode } from '../../Shared/Types';

export abstract class AbstractModel extends TreeNode<AbstractModel> {
    public readonly type: string;
    public context: CardContext;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(parent);
        this.context = context;

        this.type = json.type;
        if (this.context) {
            this.context.fit = 'content';
        }
    }

    public get children(): AbstractModel[] {
        return [];
    }
}
