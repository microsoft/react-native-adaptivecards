import { ScopeModel } from '../Abstract/ScopeModel';
export class ImageModel extends ScopeModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.url = json.url;
        this.alt = json.altText;
        this.horizontalAlignment = json.horizontalAlignment;
        this.size = json.size;
        this.style = json.style;
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
