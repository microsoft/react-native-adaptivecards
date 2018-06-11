import { ActionFactory } from '../Actions/ActionFactory';
import { CardElement } from '../Elements/CardElement';
import { CardElementType } from '../Elements/CardElementType';
import { ColumnElement } from './Column';
export class ColumnSetElement extends CardElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.columns = this.createColumnSet(json.columns);
            this.selectAction = ActionFactory.create(json.selectAction);
        }
    }
    getTypeName() {
        return CardElementType.ColumnSet;
    }
    getRequiredProperties() {
        return [];
    }
    supportAction() {
        return true;
    }
    getAction() {
        return this.selectAction;
    }
    getActions() {
        return [this.getAction()];
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
