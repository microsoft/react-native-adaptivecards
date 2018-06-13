import { CardElement } from '../Base/CardElement';
export var ActionType;
(function (ActionType) {
    ActionType["OpenUrl"] = "Action.OpenUrl";
    ActionType["Submit"] = "Action.Submit";
    ActionType["ShowCard"] = "Action.ShowCard";
})(ActionType || (ActionType = {}));
export class ActionElement extends CardElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.title = json.title;
        }
    }
    supportAction() {
        return true;
    }
    getAction() {
        return this;
    }
    getActions() {
        return [this.getAction()];
    }
    getData() {
        return {};
    }
}
