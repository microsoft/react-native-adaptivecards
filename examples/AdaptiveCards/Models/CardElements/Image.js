import { StringUtils } from '../../Utils/StringUtils';
import { ScopeModel } from '../Abstract/ScopeModel';
export class ImageModel extends ScopeModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.url = json.url;
        this.alt = json.altText;
        this.horizontalAlignment = StringUtils.toLowerCase(json.horizontalAlignment);
        this.size = StringUtils.toLowerCase(json.size);
        this.style = StringUtils.toLowerCase(json.style);
    }
    get children() {
        if (this.selectAction) {
            return [this.selectAction];
        }
        else {
            return [];
        }
    }
}
