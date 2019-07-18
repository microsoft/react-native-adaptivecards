import { StringUtils } from '../../Utils/StringUtils';
import { ContentModel } from '../Abstract/ContentModel';
export class TextBlockModel extends ContentModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.text = json.text;
        this.color = StringUtils.toLowerCase(json.color);
        this.horizontalAlignment = StringUtils.toLowerCase(json.horizontalAlignment);
        this.isSubtle = json.isSubtle || false;
        this.maxLines = json.maxLines;
        this.size = StringUtils.toLowerCase(json.size);
        this.weight = StringUtils.toLowerCase(json.weight);
        this.wrap = json.wrap || false;
    }
}
