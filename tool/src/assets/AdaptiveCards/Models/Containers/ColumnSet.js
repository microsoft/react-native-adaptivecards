import { ScopeModel } from '../Abstract/ScopeModel';
import { ColumnModel } from './Column';
export class ColumnSetModel extends ScopeModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.columns = [];
        this.height = json.height;
        this.columns = [];
        if (json.columns) {
            json.columns.forEach((item) => {
                let column = new ColumnModel(item, this, this.context);
                if (column) {
                    this.columns.push(column);
                }
            });
        }
    }
    get children() {
        if (this.selectAction) {
            return [...this.columns, this.selectAction];
        }
        return this.columns;
    }
}
