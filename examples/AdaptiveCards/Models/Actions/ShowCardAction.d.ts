import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
import { CardModel } from '../Cards/Card';
export declare class ShowCardActionModel extends ActionModel {
    title: string;
    card: CardModel;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    onAction: (onSuccess: (data: any) => void, onError: (error: any) => void) => void;
    readonly children: CardModel[];
}
