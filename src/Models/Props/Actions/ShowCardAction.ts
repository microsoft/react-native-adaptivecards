import { CardContext } from '../../../Contexts/CardContext';
import { SelectableContainerType, ViewActionType } from '../../../Shared/Types';
import { ViewNode } from '../../Nodes/Abstract/ViewNode';
import { AdaptiveCardNode } from '../../Nodes/Cards/AdaptiveCard';
import { ShowCardParam } from '../../Params/Actions/ShowCardParam';
import { ViewAction } from '../Abstract/ViewAction';

export class ShowCardAction extends ViewAction {
    public readonly type = ViewActionType.ShowCard;
    public param: ShowCardParam;

    constructor(node: ViewNode, payload: any) {
        super(node, payload);

        this.param = new ShowCardParam(payload.card);
    }

    public onAction(context: CardContext): void {
        if (this.param && this.node && this.node.children) {
            this.node.children.forEach(current => {
                if (current.type === SelectableContainerType.AdaptiveCard && !current.equals(this.param.card)) {
                    (current as AdaptiveCardNode).show = false;
                }
            });
            let card = this.node.children.find(current => current.equals(this.param.card)) as AdaptiveCardNode;
            if (!card) {
                card = this.param.card;
                console.log(card);
                card.show = true;
                this.node.insertChild(card);
            } else {
                card.show = !card.show;
            }
            context.onUpdate();
        }
    }
}
