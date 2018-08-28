import { CardContext } from '../../Contexts/CardContext';
import { OpenUrlActionModel } from '../Actions/OpenUrlAction';
import { SubmitActionModel } from '../Actions/SubmitAction';
import { ActionModelFactory } from '../Factories/ActionModelFactory';
import { AbstractModel } from './AbstractModel';
import { ContentModel } from './ContentModel';

export class ScopeModel extends ContentModel {
    public selectAction: OpenUrlActionModel | SubmitActionModel;
    public backgroundImage: string;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.selectAction = ActionModelFactory.create(json.selectAction, this, this.context) as OpenUrlActionModel | SubmitActionModel;
        if (json.backgroundImage) {
            if (typeof json.backgroundImage === 'string') {
                this.backgroundImage = json.backgroundImage;
            } else {
                this.backgroundImage = json.backgroundImage.url;
            }
            this.context.fit = 'background';
        }
    }

}
