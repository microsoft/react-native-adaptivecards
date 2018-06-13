import { FormContext } from '../../Context/FormContext';
import { OpenUrlActionElement } from '../Actions/OpenUrlAction';
import { SubmitActionElement } from '../Actions/SubmitAction';
import { ContentElement } from '../Base/ContentElement';
import { ActionFactory } from '../Factories/ActionFactory';

export abstract class FormElement extends ContentElement {
    readonly selectAction?: OpenUrlActionElement | SubmitActionElement;

    constructor(json: any) {
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

    abstract getChildren(): ContentElement[];

    getAllInputFieldIds() {
        let result: string[] = [];
        let children = this.getChildren();
        if (children) {
            children.forEach((element: ContentElement) => {
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

    validateForm(value?: any) {
        return FormContext.getInstance().validateFields(this.getAllInputFieldIds());
    }
}
