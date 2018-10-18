import { ViewActionType } from '../../../Shared/Types';
import { ShowCardParam } from '../../Params/Actions/ShowCardParam';
import { ViewAction } from '../Abstract/ViewAction';
export class ShowCardAction extends ViewAction {
    constructor(node, json) {
        super(node, json);
        this.type = ViewActionType.ShowCard;
        this.param = new ShowCardParam(json);
    }
    onAction(context) {
        if (this.param && this.node && this.node.children) {
            let card = this.node.children.find(current => current.equals(this.param.card));
            if (!card) {
                let card = this.param.card;
                this.node.insertChild(card);
            }
            card.show = true;
        }
    }
}
