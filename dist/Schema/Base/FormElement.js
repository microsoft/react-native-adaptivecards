import { FormContext } from '../../Context/FormContext';
import { ContentElement } from '../Base/ContentElement';
import { ActionFactory } from '../Factories/ActionFactory';
export var FormElementType;
(function (FormElementType) {
    FormElementType["Column"] = "Column";
    FormElementType["ColumnSet"] = "ColumnSet";
    FormElementType["Container"] = "Container";
    FormElementType["Image"] = "Image";
    FormElementType["AdaptiveCard"] = "AdaptiveCard";
})(FormElementType || (FormElementType = {}));
export class FormElement extends ContentElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.selectAction = ActionFactory.create(json.selectAction, this);
        }
    }
    hasAction() {
        return true;
    }
    getAction() {
        return this.selectAction;
    }
    getActions() {
        return [this.getAction()];
    }
    getForm() {
        return this;
    }
    getAllInputFieldIds() {
        let children = this.getChildren();
        return children.reduce((prev, current) => {
            return prev.concat(current.getAllInputFieldIds());
        }, []);
    }
    isForm() {
        return true;
    }
    validateForm(value) {
        return FormContext.getInstance().validateFields(this.getAllInputFieldIds());
    }
}
