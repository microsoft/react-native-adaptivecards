import { InputModel } from '../Abstract/InputModel';
export class TextInputModel extends InputModel {
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
        this.isValueValid = (value) => {
            let target = value !== undefined ? value : this.value;
            if (this.maxLength) {
                if (target !== undefined && target.length > this.maxLength) {
                    return false;
                }
            }
            return true;
        };
        this.isMultiline = json.isMultiline || false;
        this.maxLength = json.maxLength;
        this.style = json.style;
        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener);
        }
    }
}
