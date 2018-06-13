import { FormElement } from '../Base/FormElement';
import { ActionFactory } from '../Factories/ActionFactory';
import { CardElementFactory } from '../Factories/ContentElementFactory';
export class AdaptiveCardElement extends FormElement {
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
    getChildren() {
        return this.body;
    }
    getActions() {
        return this.actions;
    }
    hasActions() {
        return this.actions && this.actions.length > 0;
    }
    hasBody() {
        return this.body && this.body.length > 0;
    }
}
