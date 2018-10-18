import { SelectableContainerType } from '../../../Shared/Types';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { ColumnNode } from './Column';
export class ColumnSetNode extends SelectableContainerNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = SelectableContainerType.ColumnSet;
        this.children = [];
        if (payload.columns) {
            payload.columns.forEach((item) => {
                let column = new ColumnNode(this, item);
                if (column) {
                    this.children.push(column);
                }
            });
        }
        this.height = payload.height;
    }
    get columns() {
        return this.children;
    }
}
