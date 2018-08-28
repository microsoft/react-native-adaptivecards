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
    public abstract onInput: (value: string) => void;
    public abstract storeListener: (field: FormField) => void;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);
        this.id = json.id;
        this.value = json.value;
        this.placeholder = json.placeholder;
    }
}
