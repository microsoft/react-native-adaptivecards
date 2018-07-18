import { FormElement } from '../Base/FormElement';
export class ImageElement extends FormElement {
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
    getRequiredProperties() {
        return ['type', 'url'];
    }
}
