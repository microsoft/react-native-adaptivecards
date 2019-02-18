import { CardContext } from '../../Contexts/CardContext';
import { FormField } from '../../Contexts/FormStore';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';
import { ChoiceInputModel } from './ChoiceInput';
export declare class ChoiceSetModel extends InputModel {
    choices: ChoiceInputModel[];
    selected: string;
    isMultiSelect: boolean;
    style: 'compact' | 'expanded';
    constructor(json: any, parent: AbstractModel, context: CardContext);
    onInput: (value: string) => void;
    storeListener: (field: FormField) => void;
    isValueValid: (value?: string) => boolean;
    composeSelected: (values: string[]) => string;
    parseSelected: () => string[];
    readonly children: ChoiceInputModel[];
}
