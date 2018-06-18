import { FormContext } from '../../Context/FormContext';
import { OpenUrlActionElement } from '../Actions/OpenUrlAction';
import { SubmitActionElement } from '../Actions/SubmitAction';
import { ContentElement } from '../Base/ContentElement';
import { ActionFactory } from '../Factories/ActionFactory';
import { AbstractElement } from './AbstractElement';

export enum FormElementType {
    Column = 'Column',
    ColumnSet = 'ColumnSet',
    Container = 'Container',
    Image = 'Image',
    AdaptiveCard = 'AdaptiveCard',
}

export abstract class FormElement extends ContentElement {
    public readonly selectAction?: OpenUrlActionElement | SubmitActionElement;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.selectAction = ActionFactory.create(json.selectAction, this);
        }
    }

    public hasAction() {
        return true;
    }

    public getAction() {
        return this.selectAction;
    }

    public getActions() {
        return [this.getAction()];
    }

    public abstract getChildren(): ContentElement[];

    public getForm(): AbstractElement {
        return this;
    }

    public getAllInputFieldIds() {
        let children = this.getChildren();
        return children.reduce(
            (prev, current) => {
                return prev.concat(current.getAllInputFieldIds());
            },
            []
        );
    }

    public isForm() {
        return true;
    }

    public validateForm(value?: any) {
        return FormContext.getInstance().validateFields(this.getAllInputFieldIds());
    }
}
