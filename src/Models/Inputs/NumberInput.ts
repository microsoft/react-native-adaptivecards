import { CardContext } from '../../Contexts/CardContext';
import { NumberUtils } from '../../Utils/NumberUtils';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';

export class NumberInputModel extends InputModel {
    public max: number;
    public min: number;

    public constructor(json: any, parent: AbstractModel, context: CardContext) {
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
            if (NumberUtils.isNumberStrict(target)) {
                return NumberUtils.isInRange(Number(target), this.min, this.max);
            }
        }
        return true;
    }
}
