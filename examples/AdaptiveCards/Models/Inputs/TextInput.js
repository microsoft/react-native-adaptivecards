import { InputModel } from '../Abstract/InputModel';
export class TextInputModel extends InputModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.isValueValid = (value) => {
            let target = value !== undefined ? value : this.value;
            if (this.maxLength) {
                if (target && target.length > this.maxLength) {
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
            this.onInput(this.value);
        }
    }
}
