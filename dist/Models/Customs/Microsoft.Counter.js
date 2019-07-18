import { StringUtils } from '../../Utils/StringUtils';
import { ContentModel } from '../Abstract/ContentModel';
import { ActionModelFactory } from '../Factories/ActionModelFactory';
export class CounterModel extends ContentModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.onFinished = () => {
            console.log('Microsoft.Counter onFinished');
        };
        this.value = json.value;
        this.format = StringUtils.toLowerCase(json.format);
        this.delay = json.delay;
        this.callback = ActionModelFactory.create(json.callback, this, context);
    }
}
