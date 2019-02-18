import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
export declare class FactModel extends AbstractModel {
    title: string;
    value: string;
    constructor(json: any, parent: AbstractModel, context: CardContext);
}
