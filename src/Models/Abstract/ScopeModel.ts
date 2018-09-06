import { CardContext } from '../../Contexts/CardContext';
import { OpenUrlActionModel } from '../Actions/OpenUrlAction';
import { SubmitActionModel } from '../Actions/SubmitAction';
import { ActionModelFactory } from '../Factories/ActionModelFactory';
import { AbstractModel } from './AbstractModel';
import { ContentModel } from './ContentModel';

export abstract class ScopeModel extends ContentModel {
    public selectAction: OpenUrlActionModel | SubmitActionModel;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.selectAction = ActionModelFactory.create(json.selectAction, this, this.context) as OpenUrlActionModel | SubmitActionModel;
    }

}
