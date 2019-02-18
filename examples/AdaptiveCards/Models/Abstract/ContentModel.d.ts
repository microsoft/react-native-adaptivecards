import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from './AbstractModel';
export declare class ContentModel extends AbstractModel {
    id: string;
    spacing: 'none' | 'default' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding';
    separator: boolean;
    constructor(json: any, parent: AbstractModel, context: CardContext);
}
