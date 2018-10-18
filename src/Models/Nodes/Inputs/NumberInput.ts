import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { InputNode } from '../Abstract/InputNode';
import { ViewNode } from '../Abstract/ViewNode';

export class NumberInputNode extends InputNode {
    public readonly type = InputType.NumberInput;    
    public readonly max: number;
    public readonly min: number;

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        this.max = json.max;
        this.min = json.min;
    }

    public get isValid() {
        if (this.value && this.value.length !== 0) {
            if (NumberUtils.isNumberStrict(this.value)) {
                return NumberUtils.isInRange(Number(this.value), this.min, this.max);
            }
        }
        return true;
    }
}
