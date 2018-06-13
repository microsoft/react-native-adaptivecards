import { ContentElement } from '../Base/ContentElement';
import { ActionFactory } from '../Factories/ActionFactory';
export class FormElement extends ContentElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.selectAction = ActionFactory.create(json.selectAction);
        }
    }
    supportAction() {
        return true;
    }
    getAction() {
        return this.selectAction;
    }
    getActions() {
        return [this.getAction()];
    }
    getAllInputFieldIds() {
        let result = [];
        let children = this.getChildren();
        if (children) {
            this.getChildren().forEach((element) => {
                result = [...result, ...element.getAllInputFieldIds()];
            });
        }
        return result;
    }
    isInput() {
        return false;
    }
}
