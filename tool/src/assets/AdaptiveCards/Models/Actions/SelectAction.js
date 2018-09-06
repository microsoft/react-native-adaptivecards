import { ActionModel } from '../Abstract/ActionModel';
export class SelectActionModel extends ActionModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.onAction = (onSuccess, onError) => {
            if (this.context) {
                let handler = this.context.selectActionHandler;
                if (handler) {
                    handler(this.data).then(onSuccess).catch(onError);
                }
            }
        };
        this.mainTitle = json.mainTitle;
        this.subTitle = json.subTitle;
        this.data = json.data;
    }
}
