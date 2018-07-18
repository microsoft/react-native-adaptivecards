import { FormContext } from '../../Contexts/FormContext';
import { ConsoleUtils } from '../../Utils/ConsoleUtils';
import { ElementUtils } from '../../Utils/ElementUtils';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentElement } from './ContentElement';
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
        if (this.isValid) {
            this.backgroundImage = json.backgroundImage;
            this.selectAction = ActionFactory.create(json.selectAction, this);
            if (this.selectAction) {
                if (this.selectAction.type === 'Action.ShowCard') {
                    ConsoleUtils.error(this.type, 'Do not support Action.ShowCard in selectAction.');
                }
            }
        }
    }
    get action() {
        return this.selectAction;
    }
    get inputFields() {
        return this.descendsAndSelf.reduce((prev, current) => {
            if (ElementUtils.isInput(current.type)) {
                return prev.concat([current.id]);
            }
            return prev;
        }, []);
    }
    getBackgroundImageUrl() {
        if (this.backgroundImage) {
            if (typeof this.backgroundImage === 'string') {
                return this.backgroundImage;
            }
            return this.backgroundImage.url;
        }
    }
    validateForm(value) {
        return FormContext.getInstance().validateFields(this.inputFields);
    }
}
