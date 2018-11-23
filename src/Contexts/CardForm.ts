import { InputNode } from '../Models/Nodes/Abstract/InputNode';
import { AdaptiveCardNode } from '../Models/Nodes/Cards/AdaptiveCard';
import { CardDocument } from './CardDocument';

export interface IFormField {
    id: string;
    isValid(): boolean;
    stringify(): string;
}

export class CardForm {
    private model: AdaptiveCardNode;

    constructor(card: CardDocument) {
        if (card) {
            this.model = card.model;
        }
    }

    public get fields(): IFormField[] {
        if (this.model) {
            return this.model.descendsAndSelf.filter(current => current && current instanceof InputNode) as unknown as IFormField[];
        }
        return [];
    }

    public isValid(): boolean {
        return this.fields.reduce((prev, current) => {
            if (prev && current) {
                prev = prev && current.isValid();
            }
            return prev;
        }, true);
    }

    public get data(): object {
        return this.fields.reduce((prev, current) => {
            if (current.id) {
                prev[current.id] = current.stringify();
            }
            return prev;
        }, {} as any);
    }
}
