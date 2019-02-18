import { CardContext } from '../../Contexts/CardContext';
import { FormField } from '../../Contexts/FormStore';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';
import { CallbackActionModel } from '../Actions/CallbackAction';
import { CardModel } from '../Cards/Card';
export declare class PeoplePickerModel extends InputModel {
    private suggestionContext;
    suggestionCard: CardModel;
    callback: CallbackActionModel;
    selected: string;
    onSuggestionReady: (card: CardModel) => void;
    onSelect: () => void;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    isValueValid: (value?: string) => boolean;
    onInput: (value: string) => void;
    onBlur: () => void;
    onRemoveContact: (address: string) => void;
    onSuggestionSelect: (data: any) => Promise<any>;
    storeListener: (field: FormField) => void;
    private onCallbackResponse;
    private tryExtractContactFromInput;
    readonly children: CallbackActionModel[];
}
