import { SelectableContainerType } from '../../../Shared/Types';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { ViewNode } from '../Abstract/ViewNode';
import { ColumnNode } from './Column';

export class ColumnSetNode extends SelectableContainerNode {
    public readonly type = SelectableContainerType.ColumnSet;
    public readonly children: ColumnNode[] = [];
    public readonly height: 'auto' | 'stretch';

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        if (payload.columns) {
            payload.columns.forEach((item: any) => {
                let column = new ColumnNode(this, item);
                if (column) {
                    this.children.push(column);
                }
            });
        }
        this.height = payload.height;
    }

    public get columns(): ColumnNode[] {
        return this.children as ColumnNode[];
    }
}
