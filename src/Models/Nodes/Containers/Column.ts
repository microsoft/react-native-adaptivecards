import { SelectableContainerType } from '../../../Shared/Types';
import { BackgroundImage } from '../../Props/Elements/BackgroundImage';
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
    public readonly backgroundImage: BackgroundImage;

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        this.children.push(...NodeFactory.createSet(this, json.items));
        this.style = json.style;
        this.height = json.height;
        this.verticalContentAlignment = json.verticalContentAlignment;
        if (json.width) {
            if (json.width === 'auto' || json.width === 'stretch') {
                this.width = json.width;
            } else {
                let columnWidth = parseInt(json.width, 10);
                if (columnWidth < 0) {
                    columnWidth = 0;
                }
                this.width = columnWidth;
            }
        }

        if (json.backgroundImage) {
            this.backgroundImage = new BackgroundImage(json.backgroundImage);
        }
    }

    public get items() {
        return this.children;
    }
}
