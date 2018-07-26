import { AbstractElement } from './AbstractElement';
export var ActionType;
(function (ActionType) {
    ActionType["OpenUrl"] = "Action.OpenUrl";
    ActionType["Submit"] = "Action.Submit";
    ActionType["ShowCard"] = "Action.ShowCard";
    ActionType["Callback"] = "Action.Callback";
})(ActionType || (ActionType = {}));
export class ActionElement extends AbstractElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValid) {
            this.title = json.title;
        }
    }
    get action() {
        return this;
    }
}
