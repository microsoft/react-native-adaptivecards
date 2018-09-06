import { InputModel } from '../Abstract/InputModel';
import { ChoiceInputModel } from './ChoiceInput';
export class ChoiceSetModel extends InputModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.choices = [];
        this.onInput = (value) => {
            if (value !== undefined) {
                if (this.isMultiSelect) {
                    this.input = this.input + ',' + value;
                }
                else {
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
        };
        this.isValueValid = (value) => {
            if (this.isMultiSelect) {
                return value !== undefined;
            }
            else {
                return value !== undefined && value.indexOf(',') < 0;
            }
        };
        this.choices = [];
        if (json.choices) {
            json.choices.forEach((item) => {
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
