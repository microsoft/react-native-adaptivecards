import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';
export declare class ToggleInputModel extends InputModel {
    title: string;
    valueOff: string;
    valueOn: string;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    isValueValid: (value?: string) => boolean;
}
