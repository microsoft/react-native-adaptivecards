import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
export declare class SubmitActionModel extends ActionModel {
    title: string;
    data: any;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    onAction: (onSuccess: (data: any) => void, onError: (error: any) => void) => void;
    private populateFormData;
}
