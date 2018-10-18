import { ElementType } from '../../../Shared/Types';
import { MediaSource } from '../../Props/Elements/MediaSource';
import { BlockNode } from '../Abstract/BlockNode';
export class MediaNode extends BlockNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = ElementType.Media;
        this.sources = [];
        if (json.sources) {
            json.sources.forEach((item) => {
                let source = new MediaSource(item);
                if (source) {
                    this.sources.push(source);
                }
            });
        }
        this.poster = json.poster;
        this.altText = json.altText;
    }
}
