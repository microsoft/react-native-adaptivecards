import { InputType } from '../../../Shared/Types';
import { InputNode } from '../Abstract/InputNode';
import { ViewNode } from '../Abstract/ViewNode';

export class TextInputNode extends InputNode {
    public readonly type = InputType.TextInput;
    public readonly isMultiline: boolean;
    public readonly maxLength: number;
    public readonly style: 'text' | 'tel' | 'url' | 'email';

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        this.isMultiline = json.isMultiline || false;
        this.maxLength = json.maxLength;
        this.style = json.style;
    }

    public get isValid() {
        // TODO:: verify styles.
        if (this.maxLength) {
            if (this.value && this.value.length > this.maxLength) {
                return false;
            }
        }
        return true;
    }
}
