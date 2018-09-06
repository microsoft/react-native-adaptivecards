import { CardContext } from '../../Contexts/CardContext';
import { ActionModel } from '../Abstract/ActionModel';
import { CardModel } from '../Cards/Card';
export class ShowCardActionModel extends ActionModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.onAction = (onSuccess, onError) => {
            if (this.context) {
                let handler = this.context.showCardActionHandler;
                if (handler) {
                    handler(this.card).then(onSuccess).catch(onError);
                }
            }
        };
        this.card = new CardModel(json.card, this, CardContext.createInstance(this.context));
        this.title = json.title;
    }
    get children() {
        if (this.card) {
            return [this.card];
        }
        return [];
    }
}
