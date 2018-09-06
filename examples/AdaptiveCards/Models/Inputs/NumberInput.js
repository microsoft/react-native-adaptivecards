import { NumberUtils } from '../../Utils/NumberUtils';
import { InputModel } from '../Abstract/InputModel';
export class NumberInputModel extends InputModel {
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
            if (target && target.length !== 0) {
                if (NumberUtils.isNumberStrict(target)) {
                    return NumberUtils.isInRange(Number(target), this.min, this.max);
                }
            }
            return true;
        };
        this.max = json.max;
        this.min = json.min;
        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener);
            this.onInput(this.value);
        }
    }
}
