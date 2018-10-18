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

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.text = payload.text;
        this.color = payload.color;
        this.horizontalAlignment = payload.horizontalAlignment;
        this.isSubtle = payload.isSubtle || false;
        this.maxLines = payload.maxLines;
        this.size = payload.size;
        this.weight = payload.weight;
        this.wrap = payload.wrap || false;
    }
}
