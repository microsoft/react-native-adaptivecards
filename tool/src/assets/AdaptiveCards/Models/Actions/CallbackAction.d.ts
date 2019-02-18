import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
export declare class CallbackActionModel extends ActionModel {
    url: string;
    parameters: {
        [key: string]: string;
    };
    constructor(json: any, parent: AbstractModel, context: CardContext);
    onAction: (onSuccess: (data: any) => void, onError: (error: any) => void) => void;
    private readonly params;
}
