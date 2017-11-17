import {
    ColumnWidth,
} from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import Action from '../Actions/Action';
import { createAction } from '../Actions/Creator';
import CardElement from '../Elements/CardElement';
import CardElementType from '../Elements/CardElementType';
import { createCardElementSet } from '../Elements/Creator';

export default class Column extends CardElement {
    // Required
    readonly items: Array<CardElement>;
    // Optional
    readonly selectAction?: Action;
    // “auto”, “stretch”, or a number representing relative width of the column in the column group
    readonly width?: ColumnWidth | number;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.items = createCardElementSet(json.items);
            this.selectAction = createAction(json.selectAction);
            if (json.width && !isNaN(json.width)) {
                let columnWidth = parseInt(json.width, 10);
                if (columnWidth > 100) {
                    this.width = 100;
                } else if (columnWidth < 0) {
                    this.width = 0;
                } else {
                    this.width = columnWidth;
                }
            } else {
                this.width = getStringEnumValueOrDefault(ColumnWidth, json.width, ColumnWidth.Auto) as ColumnWidth;
            }
        }
    }

    getTypeName(): string {
        return CardElementType.Column;
    }
    getRequiredProperties(): Array<string> {
        return ['items'];
    }

    hasItems(): boolean {
        return this.items && this.items.length > 0;
    }

    isFixedWidth(): boolean {
        return typeof this.width === 'number';
    }
}
