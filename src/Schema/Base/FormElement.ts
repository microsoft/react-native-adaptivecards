import { FormContext } from '../../Contexts/FormContext';
import { ConsoleUtils } from '../../Utils/ConsoleUtils';
import { ElementUtils } from '../../Utils/ElementUtils';
import { ActionFactory } from '../Factories/ActionFactory';
import { AbstractElement } from './AbstractElement';
import { ActionElement } from './ActionElement';
import { ContentElement } from './ContentElement';
import { InputElement } from './InputElement';

export enum FormElementType {
    Column = 'Column',
    ColumnSet = 'ColumnSet',
    Container = 'Container',
    Image = 'Image',
    AdaptiveCard = 'AdaptiveCard',
}

export abstract class FormElement extends ContentElement {
    public readonly selectAction?: ActionElement;
    public readonly backgroundImage?: string | { url: string };

    constructor(json: any, parent: AbstractElement) {
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

    public get action() {
        return this.selectAction;
    }

    public get inputFields(): string[] {
        return this.descendsAndSelf.reduce((prev, current) => {
            if (ElementUtils.isInput(current.type)) {
                return prev.concat([(current as InputElement).id]);
            }
            return prev;
        }, []);
    }

    public getBackgroundImageUrl(): string {
        if (this.backgroundImage) {
            if (typeof this.backgroundImage === 'string') {
                return this.backgroundImage;
            }
            return this.backgroundImage.url;
        }
    }

    public validateForm(value?: any) {
        return FormContext.getInstance().validateFields(this.inputFields);
    }
}
