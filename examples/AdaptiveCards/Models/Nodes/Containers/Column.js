import { SelectableContainerType } from '../../../Shared/Types';
import { BackgroundImage } from '../../Props/Elements/BackgroundImage';
import { SelectableContainerNode } from '../Abstract/SelectableContainerNode';
import { NodeFactory } from '../NodeFactory';
export class ColumnNode extends SelectableContainerNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = SelectableContainerType.Column;
        this.children = [];
        this.children.push(...NodeFactory.createSet(this, json.items));
        this.style = json.style;
        this.height = json.height;
        this.verticalContentAlignment = json.verticalContentAlignment;
        if (json.width) {
            if (json.width === 'auto' || json.width === 'stretch') {
                this.width = json.width;
            }
            else {
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
    get items() {
        return this.children;
    }
}
