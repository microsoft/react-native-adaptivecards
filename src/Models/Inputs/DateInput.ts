import { CardContext } from '../../Contexts/CardContext';
import { NumberUtils } from '../../Utils/NumberUtils';
import { TimeUtils } from '../../Utils/TimeUtils';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';

export class DateInputModel extends InputModel {
    public max: string;
    public min: string;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.max = json.max;
        this.min = json.min;

        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener);
            this.onInput(this.value);
        }
    }

    public isValueValid = (value?: string) => {
    let target = value !== undefined ? value : this.value;
    if (target && target.length !== 0) {
        let minTime = TimeUtils.extractDate(this.min);
        let maxTime = TimeUtils.extractDate(this.max);
        let time = TimeUtils.extractDate(target);
        return NumberUtils.isInRange(time, minTime, maxTime);
    }
    return true;
}
}
