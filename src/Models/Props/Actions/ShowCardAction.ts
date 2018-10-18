import { CardContext } from '../../../Contexts/CardContext';
import { ViewActionType } from '../../../Shared/Types';
import { ViewNode } from '../../Nodes/Abstract/ViewNode';
import { AdaptiveCardNode } from '../../Nodes/Cards/AdaptiveCard';
import { ShowCardParam } from '../../Params/Actions/ShowCardParam';
import { ViewAction } from '../Abstract/ViewAction';

export class ShowCardAction extends ViewAction {
    public readonly type = ViewActionType.ShowCard;    
    public param: ShowCardParam;

    constructor(node: ViewNode, json: any) {
        super(node, json);

        this.param = new ShowCardParam(json);
    }
    
    public onAction(context: CardContext): void {
        if (this.param && this.node && this.node.children) {
            let card = this.node.children.find(current => current.equals(this.param.card)) as AdaptiveCardNode;
            if (!card) {
                let card = this.param.card;
                this.node.insertChild(card);
            }
            card.show = true;
        }
    }
}
