import { InputType } from '../../../Shared/Types';
import { InputNode } from '../Abstract/InputNode';
import { ViewNode } from '../Abstract/ViewNode';

export class ToggleInputNode extends InputNode {
    public readonly type = InputType.ToggleInput;
    public readonly title: string;
    public readonly valueOff: string;
    public readonly valueOn: string;

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        this.title = json.title;
        this.valueOff = json.valueOff;
        this.valueOn = json.valueOn;
        this.value = json.value === json.valueOn ? json.value : this.valueOff;
    }

    public onInput(input: string) {
        if (input === this.valueOn || input === this.valueOff) {
            this.value = input;
        }
    }

    public get isValid(): boolean {
        return this.value === this.valueOff && this.value === this.valueOn;
    }
}
