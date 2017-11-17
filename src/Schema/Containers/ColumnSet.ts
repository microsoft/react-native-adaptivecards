import Action from '../Actions/Action';
import { createAction } from '../Actions/Creator';
import CardElement from '../Elements/CardElement';
import CardElementType from '../Elements/CardElementType';
import Column from './Column';

export default class ColumnSet extends CardElement {
    // Optional
    readonly columns: Array<Column>;
    readonly selectAction?: Action;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.columns = this.createColumnSet(json.columns);
            this.selectAction = createAction(json.selectAction);
        }
    }

    getTypeName(): string {
        return CardElementType.ColumnSet;
    }
    getRequiredProperties(): Array<string> {
        return [];
    }

    private createColumnSet(json: any): Array<Column> {
        let columnSet: Array<Column> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let column: Column = new Column(item);
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
