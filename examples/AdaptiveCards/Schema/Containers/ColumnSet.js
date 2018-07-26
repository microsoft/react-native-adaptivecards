import { ScopeElement } from '../Abstract/ScopeElement';
import { ColumnElement } from './Column';
export class ColumnSetElement extends ScopeElement {
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
    get requiredProperties() {
        return ['type'];
    }
}
