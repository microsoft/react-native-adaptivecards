import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { OpenUrlActionModel } from '../Actions/OpenUrlAction';
import { ShowCardActionModel } from '../Actions/ShowCardAction';
import { SubmitActionModel } from '../Actions/SubmitAction';
import { ActionModelFactory } from '../Factories/ActionModelFactory';
import { ContentModelFactory } from '../Factories/ContentModelFactory';

export class CardModel extends ContentModel {
    public body: ContentModel[] = [];
    public actions: Array<OpenUrlActionModel | SubmitActionModel | ShowCardActionModel> = [];
    public backgroundImage: string;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);
        this.actions = ActionModelFactory.createSet(json.actions, this, this.context) as
            Array<OpenUrlActionModel | SubmitActionModel | ShowCardActionModel>;
        this.body = ContentModelFactory.createSet(json.body, this, this.context);
        this.backgroundImage = json.backgroundImage;

        if (this.backgroundImage) {
            this.context.fit = 'background';
        }
    }

    public get children() {
        return [...this.body, ...this.actions];
    }
}
