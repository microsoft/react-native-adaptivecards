import { SelectableContainerType } from '../../../Shared/Types';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { ViewNode } from '../Abstract/ViewNode';
import { ColumnNode } from './Column';

export class ColumnSetNode extends SelectableContainerNode {
    public readonly type = SelectableContainerType.ColumnSet;
    public readonly children: ColumnNode[] = [];
    public readonly height: 'auto' | 'stretch';

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        if (json.columns) {
            json.columns.forEach((item: any) => {
                let column = new ColumnNode(this, item);
                if (column) {
                    this.children.push(column);
                }
            });
        }
        this.height = json.height;
    }

    public get columns(): ColumnNode[] {
        return this.children as ColumnNode[];
    }
}
