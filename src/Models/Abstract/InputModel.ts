import { CardContext } from '../../Contexts/CardContext';
import { FormField } from '../../Contexts/FormStore';
import { AbstractModel } from './AbstractModel';
import { ContentModel } from './ContentModel';

export abstract class InputModel extends ContentModel {
    public id: string;
    public value: string;
    public input: string;
    public placeholder: string;
    public onStoreUpdate: (value: string) => void;
    public abstract isValueValid: (value?: string) => boolean;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);
        this.id = json.id;
        this.value = json.value;
        this.placeholder = json.placeholder;
    }

    public onInput = (value: string) => {
        if (value !== undefined) {
            this.input = value;
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
        if (field) {
            this.value = field.value;
            if (this.onStoreUpdate) {
                this.onStoreUpdate(this.value);
            }
        }
    }
}
