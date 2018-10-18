import { ElementType } from '../../../Shared/Types';
import { MediaSourceProp } from '../../Props/Elements/MediaSourceProp';
import { BlockNode } from '../Abstract/BlockNode';
import { ViewNode } from '../Abstract/ViewNode';

export class MediaNode extends BlockNode {
    public readonly type = ElementType.Media;
    public readonly sources: MediaSourceProp[] = [];
    public readonly poster: string;
    public readonly altText: string;

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        if (payload.sources) {
            payload.sources.forEach((item: any) => {
                let source = new MediaSourceProp(item);
                if (source) {
                    this.sources.push(source);
                }
            });
        }
        this.poster = payload.poster;
        this.altText = payload.altText;
    }
}
