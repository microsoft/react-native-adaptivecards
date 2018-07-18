import { ContentElement } from '../Base/ContentElement';
export class TextBlockElement extends ContentElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
        if (this.isValid) {
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
    getRequiredProperties() {
        return ['type', 'text'];
    }
}
