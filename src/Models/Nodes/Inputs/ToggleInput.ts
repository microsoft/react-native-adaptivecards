import { InputType } from '../../../Shared/Types';
import { InputNode } from '../Abstract/InputNode';
import { ViewNode } from '../Abstract/ViewNode';

export class ToggleInputNode extends InputNode<boolean, boolean> {
    public readonly type = InputType.ToggleInput;
    public readonly title: string;
    public readonly valueOff: string;
    public readonly valueOn: string;

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.title = payload.title;
        this.valueOff = payload.valueOff;
        this.valueOn = payload.valueOn;
        this.value = payload.value === payload.valueOn;
    }

    public stringify(): string {
        if (this.value) {
            return this.valueOn;
        }
        return this.valueOff;
    }

    public isValid(): boolean {
        return true;
    }

    protected handleInput(input: boolean) {
        if (input !== undefined) {
            this.value = input;
        }
    }
}
