import { ActionFactory } from './Actions/ActionFactory';
import { CardElementFactory } from './Elements/CardElementFactory';
import { TypedElement } from './TypedElement';
export class AdaptiveCardElement extends TypedElement {
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
            this.actions = ActionFactory.createSet(json.actions);
            this.body = CardElementFactory.createSet(json.body);
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
