import { CardContext } from '../../Contexts/CardContext';
import { FormField } from '../../Contexts/FormStore';
import { AbstractModel } from './AbstractModel';
import { ContentModel } from './ContentModel';
export declare abstract class InputModel extends ContentModel {
    id: string;
    value: string;
    input: string;
    placeholder: string;
    onStoreUpdate: (value: string) => void;
    abstract isValueValid: (value?: string) => boolean;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    onInput: (value: string) => void;
    storeListener: (field: FormField) => void;
}
