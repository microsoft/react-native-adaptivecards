import { ContentModel } from '../Abstract/ContentModel';
export class TextBlockModel extends ContentModel {
    constructor(json, parent, context) {
        super(json, parent, context);
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
