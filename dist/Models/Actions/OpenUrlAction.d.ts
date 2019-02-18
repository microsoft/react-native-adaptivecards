import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
export declare class OpenUrlActionModel extends ActionModel {
    title: string;
    method: 'GET' | 'POST';
    data: any;
    url: string;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    onAction: (onSuccess: (data: any) => void, onError: (error: any) => void) => void;
    private populateFormData;
}
