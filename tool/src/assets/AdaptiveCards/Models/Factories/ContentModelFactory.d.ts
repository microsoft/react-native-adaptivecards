import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
export declare class ContentModelFactory {
    static create(json: any, parent: AbstractModel, context: CardContext): ContentModel;
    static createSet(json: any, parent: AbstractModel, context: CardContext): Array<ContentModel>;
}
