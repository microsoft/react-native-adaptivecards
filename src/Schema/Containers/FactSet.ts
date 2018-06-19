import { ElementStyleConfig } from '../../Styles/StyleManager';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { FactElement } from './Fact';

export class FactSetElement extends ContentElement {
    // Required
    public readonly facts: Array<FactElement> = [];

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.facts = this.createFactSet(json.facts);
        }
    }

    public getTypeName(): string {
        return ContentElementType.FactSet;
    }

    public getRequiredProperties(): Array<string> {
        return ['facts'];
    }

    public getStyleConfig(): ElementStyleConfig {
        return {
            spacing: this.spacing,
        };
    }

    public hasFacts(): boolean {
        return this.facts && this.facts.length > 0;
    }

    private createFactSet(json: any): Array<FactElement> {
        let factSet: Array<FactElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let fact: FactElement = new FactElement(item, this);
                if (fact && fact.isValidJSON) {
                    factSet.push(fact);
                }
            });
        }
        return factSet;
    }
}
