import { CardContext } from '../../Contexts/CardContext';
import { NumberUtils } from '../../Utils/NumberUtils';
import { TimeUtils } from '../../Utils/TimeUtils';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';

export class TimeInputModel extends InputModel {
    public max: string;
    public min: string;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.max = json.max;
        this.min = json.min;
        this.placeholder = json.placeholder;
        if (!this.value && !this.placeholder) {
            this.value = TimeUtils.getTimeString(new Date());
        }

        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener);
            this.onInput(this.value);
        }
    }

    public isValueValid = (value?: string) => {
        let target = value !== undefined ? value : this.value;
        if (target && target.length !== 0) {
            let minTime = TimeUtils.extractTime(this.min);
            let maxTime = TimeUtils.extractTime(this.max);
            let time = TimeUtils.extractTime(target);
            return NumberUtils.isInRange(time, minTime, maxTime);
        }
        return true;
    }
}
