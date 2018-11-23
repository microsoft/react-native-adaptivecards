import { InputType } from '../../../Shared/Types';
import { InputNode } from '../Abstract/InputNode';
import { ViewNode } from '../Abstract/ViewNode';

export class TextInputNode extends InputNode<string, string> {
    public readonly type = InputType.TextInput;
    public readonly isMultiline: boolean;
    public readonly maxLength: number;
    public readonly style: 'text' | 'tel' | 'url' | 'email';

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.value = payload.value;
        if (this.value === undefined) {
            this.value = '';
        }
        this.isMultiline = payload.isMultiline || false;
        this.maxLength = payload.maxLength;
        this.style = payload.style;
    }

    public stringify(): string {
        return this.value;
    }

    public isValid() {
        // TODO:: verify styles.
        if (this.maxLength) {
            if (this.value && this.value.length > this.maxLength) {
                return false;
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
