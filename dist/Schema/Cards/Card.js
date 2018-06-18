import { FormElement } from '../Base/FormElement';
import { ActionFactory } from '../Factories/ActionFactory';
import { CardElementFactory } from '../Factories/ContentElementFactory';
export class CardElement extends FormElement {
    constructor(json, parent) {
        super(json, parent);
        this.actions = [];
        this.body = [];
        if (this.isValidJSON) {
            this.version = json.version;
            this.minVersion = json.minVersion;
            this.fallbackText = json.fallbackText;
            this.backgroundImage = json.backgroundImage;
            this.speak = json.speak;
            this.actions = ActionFactory.createSet(json.actions, this);
            this.body = CardElementFactory.createSet(json.body, this);
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
    getAllInputFieldIds() {
        let children = this.getChildren().concat(this.getActions());
        return children.reduce((prev, current) => {
            return prev.concat(current.getAllInputFieldIds());
        }, []);
    }
    getForm() {
        let parent = this.getParent();
        if (parent) {
            return parent.getForm();
        }
        return super.getForm();
    }
    hasActions() {
        return this.actions && this.actions.length > 0;
    }
    hasBody() {
        return this.body && this.body.length > 0;
    }
}
