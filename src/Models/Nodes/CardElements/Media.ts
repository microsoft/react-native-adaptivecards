import { ElementType } from '../../../Shared/Types';
import { MediaSource } from '../../Props/Elements/MediaSource';
import { BlockNode } from '../Abstract/BlockNode';
import { ViewNode } from '../Abstract/ViewNode';

export class MediaNode extends BlockNode {
    public readonly type = ElementType.Media;
    public readonly sources: MediaSource[] = [];
    public readonly poster: string;
    public readonly altText: string;

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        if (json.sources) {
            json.sources.forEach((item: any) => {
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
