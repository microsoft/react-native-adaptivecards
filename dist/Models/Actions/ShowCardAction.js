import { ActionModel } from '../Abstract/ActionModel';
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
        this.card = json.card;
        this.title = json.title;
    }
    get children() {
        if (this.card) {
            return [this.card];
        }
        return [];
    }
}
