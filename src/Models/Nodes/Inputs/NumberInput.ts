import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { InputNode } from '../Abstract/InputNode';
import { ViewNode } from '../Abstract/ViewNode';

export class NumberInputNode extends InputNode<string, string> {
    public readonly type = InputType.NumberInput;
    public readonly max: number;
    public readonly min: number;

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.value = payload.value;

        if (this.value !== undefined) {
            let str = this.value.toString();
            if (NumberUtils.isNumberStrict(str)) {
                this.value = str;
            } else {
                this.value = '';
            }
        } else {
            this.value = '';
        }
            
        this.max = payload.max;
        this.min = payload.min;
    }

    public stringify(): string {
        return this.value;
    }

    public isValid() {
        if (this.value && this.value.length !== 0) {
            if (NumberUtils.isNumberStrict(this.value)) {
                return NumberUtils.isInRange(Number(this.value), this.min, this.max);
            }
        }
        return true;
    }

    protected handleInput(input: string): void {
        if (input !== undefined) {
            this.value = input;
        }
    }
}
