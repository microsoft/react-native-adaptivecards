import { ContentModel } from './ContentModel';
export class InputModel extends ContentModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.onInput = (value) => {
            if (value !== undefined) {
                this.input = value;
                if (this.context && this.context.form) {
                    this.context.form.write({
                        id: this.id,
                        value: value,
                        isValid: this.isValueValid(this.input),
                    });
                }
            }
        };
        this.storeListener = (field) => {
            if (field) {
                this.value = field.value;
                if (this.onStoreUpdate) {
                    this.onStoreUpdate(this.value);
                }
            }
        };
        this.id = json.id;
        this.value = json.value;
        this.placeholder = json.placeholder;
    }
}
