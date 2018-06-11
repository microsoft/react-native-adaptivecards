import { CardElement } from '../Elements/CardElement';
import { CardElementType } from '../Elements/CardElementType';
import { FactElement } from './Fact';

export class FactSetElement extends CardElement {
    // Required
    readonly facts: Array<FactElement> = [];

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.facts = this.createFactSet(json.facts);
        }
    }

    getTypeName(): string {
        return CardElementType.FactSet;
    }
    getRequiredProperties(): Array<string> {
        return ['facts'];
    }

    private createFactSet(json: any): Array<FactElement> {
        let factSet: Array<FactElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let fact: FactElement = new FactElement(item);
                if (fact && fact.isValidJSON) {
                    factSet.push(fact);
                }
            });
        }
        return factSet;
    }

    hasFacts(): boolean {
        return this.facts && this.facts.length > 0;
    }
}
