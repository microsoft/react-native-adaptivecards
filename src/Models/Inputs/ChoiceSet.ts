import { CardContext } from '../../Contexts/CardContext';
import { FormField } from '../../Contexts/FormStore';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';
import { ChoiceInputModel } from './ChoiceInput';

export class ChoiceSetModel extends InputModel {
    public choices: ChoiceInputModel[] = [];
    public selected: string;
    public isMultiSelect: boolean;
    public style: 'compact' | 'expanded';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.choices = [];
        if (json.choices) {
            json.choices.forEach((item: any) => {
                item.type = 'Input.Choice';
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
                let selected = this.parseSelected();
                let index = selected.indexOf(value);
                if (index < 0) {
                    selected.push(value);
                } else {
                    selected.splice(index, 1);
                }
                this.input = this.composeSelected(selected);
                // To avoid lost some data when user click once more before the storeListener for last click is triggered.
                this.selected = this.input;
            } else {
                this.input = value;
            }
            if (this.context && this.context.form) {
                this.context.form.write({
                    id: this.id,
                    value: this.input,
                    isValid: this.isValueValid(this.input),
                });
            }
        }
    }

    public storeListener = (field: FormField) => {
        this.selected = field.value;
        if (field) {
            if (this.onStoreUpdate) {
                this.onStoreUpdate(this.selected);
            }
        }
    }

    public isValueValid = (value?: string) => {
        if (this.isMultiSelect) {
            return !!value;
        } else {
            return !!value && value.indexOf(',') < 0;
        }
    }

    public composeSelected = (values: string[]) => {
        if (values) {
            return values.reduce((prev, current, index) => {
                return `${prev}${(index === 0 ? '' : ',')}${current}`;
            }, '');
        }
        return '';
    }

    public parseSelected = (): string[] => {
        if (this.selected) {
            return this.selected.split(',').filter(s => !!s);
        }
        return [];
    }

    public get children() {
        if (this.choices) {
            return this.choices;
        }
        return [];
    }
}
