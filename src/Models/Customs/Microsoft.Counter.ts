import { CardContext } from '../../Contexts/CardContext';
import { StringUtils } from '../../Utils/StringUtils';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
import { ContentModel } from '../Abstract/ContentModel';
import { ActionModelFactory } from '../Factories/ActionModelFactory';

export class CounterModel extends ContentModel {
    public value: number;
    public format: 'Timer' | 'CountDown';
    public delay: number;
    public callback: ActionModel;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.value = json.value;
        this.format = StringUtils.toLowerCase(json.format);
        this.delay = json.delay;
        this.callback = ActionModelFactory.create(json.callback, this, context);
    }

    public onFinished = () => {
        console.log('Microsoft.Counter onFinished');
    }
}
