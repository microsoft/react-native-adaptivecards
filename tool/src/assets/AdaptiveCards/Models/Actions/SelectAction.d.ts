import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
export declare class SelectActionModel extends ActionModel {
    mainTitle: string;
    subTitle: string;
    data: any;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    onAction: (onSuccess: (data: any) => void, onError: (error: any) => void) => void;
}
