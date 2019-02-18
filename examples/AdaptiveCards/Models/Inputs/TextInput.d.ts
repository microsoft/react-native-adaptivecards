import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';
export declare class TextInputModel extends InputModel {
    isMultiline: boolean;
    maxLength: number;
    style: 'text' | 'tel' | 'url' | 'email';
    constructor(json: any, parent: AbstractModel, context: CardContext);
    isValueValid: (value?: string) => boolean;
}
