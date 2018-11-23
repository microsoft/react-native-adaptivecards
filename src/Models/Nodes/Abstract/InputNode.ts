import { CardContext } from '../../../Contexts/CardContext';
import { IFormField } from '../../../Contexts/CardForm';
import { InputType } from '../../../Shared/Types';
import { BlockNode } from './BlockNode';
import { ViewNode } from './ViewNode';

export abstract class InputNode<TValue, TInput> extends BlockNode implements IFormField {
    public abstract readonly type: InputType;
    public value: TValue;
    public readonly placeholder: string;

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.placeholder = payload.placeholder;
    }

    public onInput(input: TInput, context: CardContext) {
        if (this.handleInput) {
            this.handleInput(input);
        }

        if (context) {
            context.onUpdate();
        }
    }

    public abstract stringify(): string;

    public abstract isValid(): boolean;

    protected abstract handleInput(input: TInput): void;
}
