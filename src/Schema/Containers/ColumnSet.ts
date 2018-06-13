import { ContentElementType } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { ColumnElement } from './Column';

export class ColumnSetElement extends FormElement {
    // Optional
    readonly columns: Array<ColumnElement>;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.columns = this.createColumnSet(json.columns);
        }
    }

    getTypeName(): string {
        return ContentElementType.ColumnSet;
    }

    getRequiredProperties(): Array<string> {
        return [];
    }

    getChildren() {
        return this.columns;
    }

    private createColumnSet(json: any): Array<ColumnElement> {
        let columnSet: Array<ColumnElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let column: ColumnElement = new ColumnElement(item);
                if (column && column.isValidJSON) {
                    columnSet.push(column);
                }
            });
        }
        return columnSet;
    }

    hasColumns(): boolean {
        return this.columns && this.columns.length > 0;
    }
}
