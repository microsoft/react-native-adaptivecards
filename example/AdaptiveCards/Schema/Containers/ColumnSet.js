import { FormElement } from '../Base/FormElement';
import { ColumnElement } from './Column';
export class ColumnSetElement extends FormElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValid) {
            this.columns = [];
            if (json.columns) {
                json.columns.forEach((item) => {
                    let column = new ColumnElement(item, this);
                    if (column && column.isValid) {
                        this.columns.push(column);
                    }
                });
            }
        }
    }
    get children() {
        if (this.columns) {
            return this.columns;
        }
        return [];
    }
    getRequiredProperties() {
        return ['type'];
    }
}
