import { CardContext } from '../../Contexts/CardContext';
import { OpenUrlActionModel } from '../Actions/OpenUrlAction';
import { SubmitActionModel } from '../Actions/SubmitAction';
import { AbstractModel } from './AbstractModel';
import { ContentModel } from './ContentModel';
export declare abstract class ScopeModel extends ContentModel {
    selectAction: OpenUrlActionModel | SubmitActionModel;
    constructor(json: any, parent: AbstractModel, context: CardContext);
}
