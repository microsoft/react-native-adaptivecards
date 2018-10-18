import { SelectableContainerType } from '../../../Shared/Types';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { ColumnNode } from './Column';
export class ColumnSetNode extends SelectableContainerNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = SelectableContainerType.ColumnSet;
        this.children = [];
        if (json.columns) {
            json.columns.forEach((item) => {
                let column = new ColumnNode(this, item);
                if (column) {
                    this.children.push(column);
                }
            });
        }
        this.height = json.height;
    }
    get columns() {
        return this.children;
    }
}
