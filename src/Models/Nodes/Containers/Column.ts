import { SelectableContainerType } from '../../../Shared/Types';
import { BackgroundImageProp } from '../../Props/Elements/BackgroundImageProp';
import { BlockNode } from '../Abstract/BlockNode';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { ViewNode } from '../Abstract/ViewNode';
import { NodeFactory } from '../NodeFactory';

export class ColumnNode extends SelectableContainerNode {
    public readonly type = SelectableContainerType.Column;
    public readonly children: BlockNode[] = [];
    public readonly width: 'auto' | 'stretch' | number;
    public readonly height: 'auto' | 'stretch';
    public readonly verticalContentAlignment: 'top' | 'center' | 'bottom';
    public readonly style: 'default' | 'emphasis';
    public readonly backgroundImage: BackgroundImageProp;

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.children.push(...NodeFactory.createSet(this, payload.items));
        this.style = payload.style;
        this.height = payload.height;
        this.verticalContentAlignment = payload.verticalContentAlignment;
        if (payload.width) {
            if (payload.width === 'auto' || payload.width === 'stretch') {
                this.width = payload.width;
            } else {
                let columnWidth = parseInt(payload.width, 10);
                if (columnWidth < 0) {
                    columnWidth = 0;
                }
                this.width = columnWidth;
            }
        }

        if (payload.backgroundImage) {
            this.backgroundImage = new BackgroundImageProp(payload.backgroundImage);
        }
    }

    public get items() {
        return this.children;
    }
}
