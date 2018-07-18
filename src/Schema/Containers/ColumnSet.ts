import { AbstractElement } from '../Base/AbstractElement';
import { FormElement } from '../Base/FormElement';
import { ColumnElement } from './Column';

export class ColumnSetElement extends FormElement {
    // Optional
    public readonly columns?: ColumnElement[];

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.columns = [];
            if (json.columns) {
                json.columns.forEach((item: any) => {
                    let column: ColumnElement = new ColumnElement(item, this);
                    if (column && column.isValid) {
                        this.columns.push(column);
                    }
                });
            }
        }
    }

    public get children() {
        if (this.columns) {
            return this.columns;
        }
        return [];
    }

    protected getRequiredProperties(): Array<string> {
        return ['type'];
    }
}
