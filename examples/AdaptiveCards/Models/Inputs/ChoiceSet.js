import { InputModel } from '../Abstract/InputModel';
import { ChoiceInputModel } from './ChoiceInput';
export class ChoiceSetModel extends InputModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.choices = [];
        this.onInput = (value) => {
            if (value !== undefined) {
                if (this.isMultiSelect) {
                    let selected = this.parseSelected();
                    let index = selected.indexOf(value);
                    if (index < 0) {
                        selected.push(value);
                    }
                    else {
                        selected.splice(index, 1);
                    }
                    this.input = this.composeSelected(selected);
                    this.selected = this.input;
                }
                else {
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
        };
        this.storeListener = (field) => {
            this.selected = field.value;
            if (field) {
                if (this.onStoreUpdate) {
                    this.onStoreUpdate(this.selected);
                }
            }
        };
        this.isValueValid = (value) => {
            if (this.isMultiSelect) {
                return !!value;
            }
            else {
                return !!value && value.indexOf(',') < 0;
            }
        };
        this.composeSelected = (values) => {
            if (values) {
                return values.reduce((prev, current, index) => {
                    return `${prev}${(index === 0 ? '' : ',')}${current}`;
                }, '');
            }
            return '';
        };
        this.parseSelected = () => {
            if (this.selected) {
                return this.selected.split(',').filter(s => !!s);
            }
            return [];
        };
        this.choices = [];
        if (json.choices) {
            json.choices.forEach((item) => {
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
    get children() {
        if (this.choices) {
            return this.choices;
        }
        return [];
    }
}
