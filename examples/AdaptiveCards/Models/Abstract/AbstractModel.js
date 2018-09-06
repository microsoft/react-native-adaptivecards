import { TreeNode } from '../../Shared/Types';
export class AbstractModel extends TreeNode {
    constructor(json, parent, context) {
        super(parent);
        this.context = context;
        this.type = json.type;
        if (this.context) {
            this.context.fit = 'content';
        }
    }
    get children() {
        return [];
    }
}
