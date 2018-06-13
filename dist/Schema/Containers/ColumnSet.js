import { ContentElementType } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { ColumnElement } from './Column';
export class ColumnSetElement extends FormElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.columns = this.createColumnSet(json.columns);
        }
    }
    getTypeName() {
        return ContentElementType.ColumnSet;
    }
    getRequiredProperties() {
        return [];
    }
    getChildren() {
        return this.columns;
    }
    createColumnSet(json) {
        let columnSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let column = new ColumnElement(item);
                if (column && column.isValidJSON) {
                    columnSet.push(column);
                }
            });
        }
        return columnSet;
    }
    hasColumns() {
        return this.columns && this.columns.length > 0;
    }
}
