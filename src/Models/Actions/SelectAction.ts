import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';

export class SelectActionModel extends ActionModel {
    public mainTitle: string;
    public subTitle: string;
    public data: any;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.mainTitle = json.mainTitle;
        this.subTitle = json.subTitle;
        this.data = json.data;
    }

    public onAction = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
        if (this.context) {
            let handler = this.context.selectActionHandler;
            if (handler) {
                handler(this.data).then(onSuccess).catch(onError);
            }
        }
    }
}
