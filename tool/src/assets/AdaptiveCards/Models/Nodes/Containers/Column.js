import { SelectableContainerType } from '../../../Shared/Types';
import { BackgroundImageProp } from '../../Props/Elements/BackgroundImageProp';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { NodeFactory } from '../NodeFactory';
export class ColumnNode extends SelectableContainerNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = SelectableContainerType.Column;
        this.children = [];
        this.children.push(...NodeFactory.createSet(this, payload.items));
        this.style = payload.style;
        this.height = payload.height;
        this.verticalContentAlignment = payload.verticalContentAlignment;
        if (payload.width) {
            if (payload.width === 'auto' || payload.width === 'stretch') {
                this.width = payload.width;
            }
            else {
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
    get items() {
        return this.children;
    }
}
