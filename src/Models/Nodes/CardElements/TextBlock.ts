import { ElementType } from '../../../Shared/Types';
import { BlockNode } from '../Abstract/BlockNode';
import { ViewNode } from '../Abstract/ViewNode';

export class TextBlockNode extends BlockNode {
    public readonly type = ElementType.TextBlock;
    public readonly text: string;
    public readonly color?: 'default' | 'dark' | 'light' | 'accent' | 'good' | 'warning' | 'attention';
    public readonly horizontalAlignment?: 'left' | 'center' | 'right';
    public readonly isSubtle?: boolean;
    public readonly maxLines?: number;
    public readonly size?: 'default' | 'small' | 'medium' | 'large' | 'extraLarge';
    public readonly weight?: 'default' | 'lighter' | 'bolder';
    public readonly wrap?: boolean;

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        this.text = json.text;
        this.color = json.color;
        this.horizontalAlignment = json.horizontalAlignment;
        this.isSubtle = json.isSubtle || false;
        this.maxLines = json.maxLines;
        this.size = json.size;
        this.weight = json.weight;
        this.wrap = json.wrap || false;
    }
}
