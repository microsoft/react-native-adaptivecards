import { ActionFactory } from '../Actions/ActionFactory';
import { OpenUrlActionElement } from '../Actions/OpenUrlAction';
import { SubmitActionElement } from '../Actions/SubmitAction';
import { CardElement } from '../Elements/CardElement';
import { CardElementType } from '../Elements/CardElementType';
import { ColumnElement } from './Column';

export class ColumnSetElement extends CardElement {
    // Optional
    readonly columns: Array<ColumnElement>;
    readonly selectAction?: OpenUrlActionElement | SubmitActionElement;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.columns = this.createColumnSet(json.columns);
            this.selectAction = ActionFactory.create(json.selectAction);
        }
    }

    getTypeName(): string {
        return CardElementType.ColumnSet;
    }

    getRequiredProperties(): Array<string> {
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
