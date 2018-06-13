import { FormContext } from '../../Context/FormContext';
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
            children.forEach((element) => {
                result = [...result, ...element.getAllInputFieldIds()];
            });
        }
        return result;
    }
    isInput() {
        return false;
    }
    isForm() {
        return true;
    }
    validateForm(value) {
        let children = this.getChildren();
        if (children) {
            return children.reduce((prev, current) => {
                return prev && FormContext.getInstance().validateField(current);
            }, true);
        }
        return true;
    }
}
