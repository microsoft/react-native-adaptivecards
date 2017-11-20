import TypedElement from './TypedElement';
import { createActionSet } from './Actions/Creator';
import { createCardElementSet } from './Elements/Creator';
export default class AdaptiveCard extends TypedElement {
    constructor(json) {
        super(json);
        this.actions = [];
        this.body = [];
        if (this.isValidJSON) {
            this.version = json.version;
            this.minVersion = json.minVersion;
            this.fallbackText = json.fallbackText;
            this.backgroundImage = json.backgroundImage;
            this.speak = json.speak;
            this.actions = createActionSet(json.actions);
            this.body = createCardElementSet(json.body);
        }
    }
    getTypeName() {
        return 'AdaptiveCard';
    }
    getRequiredProperties() {
        return ['version'];
    }
    hasActions() {
        return this.actions && this.actions.length > 0;
    }
    hasBody() {
        return this.body && this.body.length > 0;
    }
}
