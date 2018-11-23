import { SelectableContainerType, ViewActionType } from '../../../Shared/Types';
import { ShowCardParam } from '../../Params/Actions/ShowCardParam';
import { ViewAction } from '../Abstract/ViewAction';
export class ShowCardAction extends ViewAction {
    constructor(node, payload) {
        super(node, payload);
        this.type = ViewActionType.ShowCard;
        this.param = new ShowCardParam(payload.card);
    }
    onAction(context) {
        if (this.param && this.node && this.node.children) {
            this.node.children.forEach(current => {
                if (current.type === SelectableContainerType.AdaptiveCard && !current.equals(this.param.card)) {
                    current.show = false;
                }
            });
            let card = this.node.children.find(current => current.equals(this.param.card));
            if (!card) {
                card = this.param.card;
                console.log(card);
                card.show = true;
                this.node.insertChild(card);
            }
            else {
                card.show = !card.show;
            }
            context.onUpdate();
        }
    }
}
