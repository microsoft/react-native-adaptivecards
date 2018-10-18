import { BlockType } from '../../../Shared/Types';
import { ViewNode } from './ViewNode';

export abstract class BlockNode extends ViewNode {
    public abstract readonly type: BlockType;
    public readonly spacing: 'none' | 'default' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding';
    public readonly separator: boolean;

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.spacing = payload.spacing;
        this.separator = payload.separator;
    }
}
