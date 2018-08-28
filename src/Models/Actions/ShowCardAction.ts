import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
import { CardModel } from '../Cards/Card';

export class ShowCardActionModel extends ActionModel {
    public title: string;
    public card: CardModel;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.card = new CardModel(json.card, this, CardContext.createInstance(this.context));
        this.title = json.title;
    }

    public onAction = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
        if (this.context) {
            let handler = this.context.showCardActionHandler;
            if (handler) {
                handler(this.card).then(onSuccess).catch(onError);
            }
        }
    }

    public get children() {
        if (this.card) {
            return [this.card];
        }
        return [];
    }
}
