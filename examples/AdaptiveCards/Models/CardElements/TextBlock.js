import { StringUtils } from '../../Utils/StringUtils';
import { ContentModel } from '../Abstract/ContentModel';
export class TextBlockModel extends ContentModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.text = json.text;
        this.color = StringUtils.normalize(json.color);
        this.horizontalAlignment = StringUtils.normalize(json.horizontalAlignment);
        this.isSubtle = json.isSubtle || false;
        this.maxLines = json.maxLines;
        this.size = StringUtils.normalize(json.size);
        this.weight = StringUtils.normalize(json.weight);
        this.wrap = json.wrap || false;
        this.isVisible = typeof json.isVisible === 'boolean' ? json.isVisible : true;
    }
}
