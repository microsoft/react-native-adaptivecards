import { InputModel } from '../Abstract/InputModel';
export class ToggleInputModel extends InputModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.isValueValid = (value) => true;
        this.title = json.title;
        this.valueOff = json.valueOff;
        this.valueOn = json.valueOn;
        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener);
            this.onInput(this.value);
        }
    }
}
