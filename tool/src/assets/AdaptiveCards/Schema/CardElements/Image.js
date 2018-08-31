import { ScopeElement } from '../Abstract/ScopeElement';
export class ImageElement extends ScopeElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
        if (this.isValid) {
            this.url = json.url;
            this.altText = json.altText;
            this.horizontalAlignment = json.horizontalAlignment;
            this.size = json.size;
            this.style = json.style;
        }
    }
    get requiredProperties() {
        return ['type', 'url'];
    }
}
