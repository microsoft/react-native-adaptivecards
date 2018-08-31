import { ScopeElement } from '../Abstract/ScopeElement';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentElementFactory } from '../Factories/ContentElementFactory';
export class CardElement extends ScopeElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValid) {
            this.version = json.version;
            this.minVersion = json.minVersion;
            this.fallbackText = json.fallbackText;
            this.speak = json.speak;
            this.actions = ActionFactory.createSet(json.actions, this);
            this.body = ContentElementFactory.createSet(json.body, this);
            this.backgroundImage = json.backgroundImage;
        }
    }
    get children() {
        let result = [];
        if (this.body) {
            result = result.concat(this.body);
        }
        if (this.actions) {
            result = result.concat(this.actions);
        }
        return result;
    }
    getBackgroundImageUrl() {
        return this.backgroundImage;
    }
    get requiredProperties() {
        return ['type', 'version'];
    }
}
