import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';
export declare class NumberInputModel extends InputModel {
    max: number;
    min: number;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    isValueValid: (value?: string) => boolean;
}
