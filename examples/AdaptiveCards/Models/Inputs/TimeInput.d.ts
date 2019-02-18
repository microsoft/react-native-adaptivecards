import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';
export declare class TimeInputModel extends InputModel {
    max: string;
    min: string;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    isValueValid: (value?: string) => boolean;
}
