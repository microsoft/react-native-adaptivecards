import { CardContext } from '../../Contexts/CardContext';
import { FormField } from '../../Contexts/FormStore';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';

export class TextInputModel extends InputModel {
    public isMultiline: boolean;
    public maxLength: number;
    public style: 'text' | 'tel' | 'url' | 'email';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.isMultiline = json.isMultiline || false;
        this.maxLength = json.maxLength;
        this.style = json.style;

        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener);
            this.onInput(this.value);
        }
    }

    public onInput = (value: string) => {
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
    }

    public storeListener = (field: FormField) => {
        if (field) {
            this.value = field.value;
            if (this.onStoreUpdate) {
                this.onStoreUpdate(this.value);
            }
        }
    }

    public isValueValid = (value?: string) => {
        let target = value !== undefined ? value : this.value;
        // TODO:: verify styles.
        if (this.maxLength) {
            if (target !== undefined && target.length > this.maxLength) {
                return false;
            }
        }
        return true;
    }
}
