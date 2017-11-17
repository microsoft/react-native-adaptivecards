import { createAction } from '../Actions/Creator';
import CardElement from '../Elements/CardElement';
import CardElementType from '../Elements/CardElementType';
import Column from './Column';
export default class ColumnSet extends CardElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.columns = this.createColumnSet(json.columns);
            this.selectAction = createAction(json.selectAction);
        }
    }
    getTypeName() {
        return CardElementType.ColumnSet;
    }
    getRequiredProperties() {
        return [];
    }
    createColumnSet(json) {
        let columnSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let column = new Column(item);
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
