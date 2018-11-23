import { ElementType } from '../../../Shared/Types';
import { MediaSourceProp } from '../../Props/Elements/MediaSourceProp';
import { BlockNode } from '../Abstract/BlockNode';
export class MediaNode extends BlockNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = ElementType.Media;
        this.sources = [];
        if (payload.sources) {
            payload.sources.forEach((item) => {
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
