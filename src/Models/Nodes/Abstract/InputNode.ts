import { InputType } from '../../../Shared/Types';
import { BlockNode } from './BlockNode';
import { ViewNode } from './ViewNode';

export abstract class InputNode extends BlockNode {
    public abstract readonly type: InputType;
    public value: string;
    public readonly placeholder: string;

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        this.value = json.value;
        this.placeholder = json.placeholder;
    }

    public onInput(input: string) {
        if (input !== undefined) {
            this.value = input;
        }
    }
    public abstract get isValid(): boolean;
} 
