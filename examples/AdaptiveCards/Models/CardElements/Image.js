import { StringUtils } from '../../Utils/StringUtils';
import { ScopeModel } from '../Abstract/ScopeModel';
export class ImageModel extends ScopeModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.url = json.url;
        this.alt = json.altText;
        this.horizontalAlignment = StringUtils.normalize(json.horizontalAlignment);
        this.size = StringUtils.normalize(json.size);
        this.style = StringUtils.normalize(json.style);
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
