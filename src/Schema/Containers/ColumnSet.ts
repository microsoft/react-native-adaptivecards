import { ScopeElement } from '../Abstract/ScopeElement';
import { IElement } from '../Interfaces/IElement';
import { ColumnElement } from './Column';

export class ColumnSetElement extends ScopeElement {
    // Optional
    public readonly columns?: ColumnElement[];
    public readonly height?: 'auto' | 'stretch';

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.height = json.height;

            this.columns = [];
            if (json.columns) {
                json.columns.forEach((item: any) => {
                    let column: ColumnElement = new ColumnElement(item, this);
                    if (column && column.isValid) {
                        this.columns.push(column);
                    }
                });
            }
        }
    }

    public get children() {
        if (this.columns) {
            return this.columns;
        }
        return [];
    }

    public get requiredProperties() {
        return ['type'];
    }
}
