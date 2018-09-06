import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';
import { ChoiceInputModel } from './ChoiceInput';

export class ChoiceSetModel extends InputModel {
    public choices: ChoiceInputModel[] = [];
    public isMultiSelect: boolean;
    public style: 'compact' | 'expanded';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.choices = [];
        if (json.choices) {
            json.choices.forEach((item: any) => {
                let choice = new ChoiceInputModel(item, this, this.context);
                if (choice) {
                    this.choices.push(choice);
                }
            });
        }
        this.isMultiSelect = json.isMultiSelect;
        this.style = json.style;

        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener);
            this.onInput(this.value);
        }
    }

    public onInput = (value: string) => {
        if (value !== undefined) {
            if (this.isMultiSelect) {
                this.input = this.input + ',' + value;
            } else {
                this.input = value;
            }
            if (this.context && this.context.form) {
                this.context.form.write({
                    id: this.id,
                    value: value,
                    isValid: this.isValueValid(this.input),
                });
            }
        }

    }

    public isValueValid = (value?: string) => {
        if (this.isMultiSelect) {
            return value !== undefined;
        } else {
            return value !== undefined && value.indexOf(',') < 0;
        }
    }

    public get children() {
        if (this.choices) {
            return this.choices;
        }
        return [];
    }
}
