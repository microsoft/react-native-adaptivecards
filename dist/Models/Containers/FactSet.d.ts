import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { FactModel } from './Fact';
export declare class FactSetModel extends ContentModel {
    facts: FactModel[];
    constructor(json: any, parent: AbstractModel, context: CardContext);
    readonly children: FactModel[];
}
