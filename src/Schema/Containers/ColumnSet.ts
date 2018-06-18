import { AbstractElement } from '../Base/AbstractElement';
import { ContentElementType } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { ColumnElement } from './Column';

export class ColumnSetElement extends FormElement {
    // Optional
    public readonly columns: Array<ColumnElement>;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.columns = this.createColumnSet(json.columns);
        }
    }

    public getTypeName(): string {
        return ContentElementType.ColumnSet;
    }

    public getRequiredProperties(): Array<string> {
        return [];
    }

    public getChildren() {
        return this.columns;
    }

    public hasColumns(): boolean {
        return this.columns && this.columns.length > 0;
    }

    private createColumnSet(json: any): Array<ColumnElement> {
        let columnSet: Array<ColumnElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let column: ColumnElement = new ColumnElement(item, this);
                if (column && column.isValidJSON) {
                    columnSet.push(column);
                }
            });
        }
        return columnSet;
    }
}
