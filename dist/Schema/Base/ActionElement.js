import { AbstractElement } from '../Base/AbstractElement';
export var ActionType;
(function (ActionType) {
    ActionType["OpenUrl"] = "Action.OpenUrl";
    ActionType["Submit"] = "Action.Submit";
    ActionType["ShowCard"] = "Action.ShowCard";
})(ActionType || (ActionType = {}));
export class ActionElement extends AbstractElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.title = json.title;
        }
    }
    hasAction() {
        return true;
    }
    getAction() {
        return this;
    }
    getActions() {
        return [this.getAction()];
    }
    getForm() {
        return this.getParent().getForm();
    }
    getData() {
        return {};
    }
    getStyleConfig() {
        return {};
    }
    isAction() {
        return true;
    }
}
